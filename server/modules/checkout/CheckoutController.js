import stripe from 'stripe';
import models from '../../database/models';
import { errorResponse } from '../../helpers/errorResponse';


const stripeKey = stripe(process.env.STRIPE_SECRET_KEY);
const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;

class CheckoutController {
  static getCheckout(req, res) {
    res.render('index', { publishableKey });
  }

  static async checkout(req, res, purchasePrice, userId, shippingId, stripeEmail, stripeToken) {
    try {
      const customer = await stripeKey.customers.create({
        email: stripeEmail,
        source: stripeToken
      });

      const payment = await stripeKey.charges.create({
        amount: purchasePrice,
        description: 'Payment for order on products',
        currency: 'usd',
        customer: customer.id
      });

      const cart = await models.ShoppingCart.findAll({
        where: { customerId: userId },
        include: [{
          model: models.Product,
          attributes: { exclude: ['createdAt', 'updatedAt'], },
        }]
      });

      if (cart.length !== 0) {
        const cartValues = await Promise.all(cart.map(async (product) => {
          const colors = await models.Color.findAll({ where: { id: product.colorId } });
          const individualColors = await colors.map(color => ({
            colorId: color.id
          }));
          const sizes = await models.Size.findAll({ where: { id: product.sizeId } });
          const individualSizes = await sizes.map(size => ({
            sizeId: size.id
          }));

          return {
            totalAmount: parseFloat(product.quantity * product.Product.price),
            comments: payment.description,
            authCode: stripeToken,
            customerId: product.customerId,
            shippingId,
            reference: payment.balance_transaction,
            colorId: individualColors[0].colorId,
            sizeId: individualSizes[0].sizeId,
            productId: product.Product.id,
            quantity: product.quantity,
            unitCost: product.Product.price
          };
        }));
        const createOrder = await models.Order.bulkCreate(cartValues);
        if (createOrder) {
          await models.ShoppingCart.destroy({ where: { customerId: userId } });
          return res.status(200).json({
            success: true,
            message: 'Payment successfully made'
          });
        }
        return errorResponse('Payment not successful', 500, res);
      }
    } catch (error) {
      return errorResponse(error, 500, res);
    }
  }

  static async makePayment(req, res) {
    const { stripeEmail, stripeToken, shippingId } = req.body;
    const userId = req.user;
    try {
      const shippingExists = await models.Shipping.findByPk(shippingId);
      if (!shippingExists) {
        const error = 'This shipping id does not exist';
        return errorResponse(error, 404, res);
      }

      const costForShipping = parseFloat(shippingExists.shippingCost);
      const cart = await models.ShoppingCart.findAll({
        where: { customerId: userId },
        include: [{
          model: models.Product,
          attributes: { exclude: ['createdAt', 'updatedAt'], },
        }]
      });

      let subTotalPrices = 0;
      let productsDiscount = 0;

      await Promise.all(cart.map(async (product) => {
        const salesDiscount = parseFloat(product.Product.discountedPrice);
        const salesPrice = parseFloat(product.quantity * product.Product.price);
        subTotalPrices += salesPrice;
        productsDiscount += salesDiscount;
      }));

      const totalPrice = subTotalPrices - productsDiscount;
      const purchasePrice = Math.round((totalPrice + costForShipping) * 100);

      return CheckoutController.checkout(req, res, purchasePrice, userId, shippingExists.id, stripeEmail, stripeToken);
    } catch (error) {
      return errorResponse(error, 500, res);
    }
  }

  static async getOrders(req, res) {
    const userId = req.user;
    try {
      const orders = await models.Order.findAll({
        where: { customerId: userId },
        include: [{
          model: models.Product,
          attributes: { exclude: ['createdAt', 'updatedAt'], },
        }]
      });
      
      if (orders.length !== 0) {
        const orderValues = await Promise.all(orders.map(async (product) => {
          const colors = await models.Color.findAll({ where: { id: product.colorId } });
          const individualColors = await colors.map(color => ({
            color: color.value
          }));
          const sizes = await models.Size.findAll({ where: { id: product.sizeId } });
          const individualSizes = await sizes.map(size => ({
            size: size.value
          }));

          return {
            user: product.customerId,
            quantity: product.quantity,
            totalAmount: product.totalAmount,
            status: product.status,
            color: individualColors[0].color,
            size: individualSizes[0].size,
            comments: product.comments,
            createdOn: product.createdAt,
            product: {
              name: product.Product.name,
              price: product.Product.price,
              thumbnail: product.Product.thumbnail,
              productTotalPrice: parseFloat(product.quantity * product.Product.price)
            }
          };
        }));

        return res.status(200).json({
          success: true,
          message: 'orders succesfully retrieved',
          order: orderValues
        });
      }
      const message = 'No order found';
      return errorResponse(message, 200, res);
    } catch (error) {
      return errorResponse(error, 500, res);
    }
  }

  static async getShippingRegions(req, res) {
    try {
      const regions = await models.ShippingRegion.findAll({
        include: [{
          model: models.Shipping,
          attributes: { exclude: ['createdAt', 'updatedAt', 'shippingRegionId'], },
        }]
      });

      return res.status(200).json({
        success: true,
        message: 'Regions succesfully retrieved',
        regions
      });
    } catch (error) {
      return errorResponse(error, 500, res);
    }
  }
}

export default CheckoutController;
