import stripe from 'stripe';
import models from '../../database/models';
import { errorResponse } from '../../helpers/errorResponse';
import { sendOrderConfirmation } from '../../helpers/mail/mailer';


const stripeKey = stripe(process.env.STRIPE_SECRET_KEY);
const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;

/**
 * @class CheckoutController
 */
class CheckoutController {
  /**
   * @description query to get to the payment routes
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @memberof CheckoutController
   */
  static getCheckout(req, res) {
    res.json({ publishableKey });
  }

  /**
   * @description query to create customer on stripe and save orders in the orders table
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @memberof CheckoutController
   */
  static async checkout(req, res, purchasePrice, shippingId, stripeEmail, stripeToken, cartId) {
    const userId = req.user;
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
        where: { cart_id: cartId },
        include: [{
          model: models.Product,
          attributes: { exclude: ['createdAt', 'updatedAt'], },
        }]
      });

      const user = await models.Customer.findOne({ where: { customer_id: userId } });

      if (cart.length !== 0) {
        const cartValues = await Promise.all(cart.map(async product => ({
          total_amount: parseFloat(product.quantity * product.Product.price).toFixed(2),
          created_on: new Date(),
          comments: payment.description,
          customer_id: userId,
          auth_code: stripeToken,
          reference: payment.balance_transaction,
          shipping_id: shippingId,
          product_id: product.Product.product_id,
          attributes: product.attributes,
          product_name: product.Product.name,
          quantity: product.quantity,
          unit_cost: product.Product.price
        })));
        const createOrder = await models.Order.bulkCreate(cartValues);
        if (createOrder) {
          await sendOrderConfirmation(user.name, cartValues, user.email);
          await models.ShoppingCart.destroy({ where: { cart_id: cartId } });
          return res.status(200).json({
            success: true,
            message: 'Payment successfully made'
          });
        }
        return errorResponse('Payment not successful', 500, res);
      }
    } catch (error) { /* istanbul ignore next */
      return errorResponse(error, 500, res);
    }
  }

  /**
   * @description query to make the payment on stripe and save orders in the orders table
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @memberof CheckoutController
   */
  /* istanbul ignore next */
  static async makePayment(req, res) {
    const {
      stripeEmail, stripeToken, shippingId, cartId
    } = req.body;
    try {
      const shippingExists = await models.Shipping.findByPk(shippingId);
      if (!shippingExists) {
        const error = 'This shipping id does not exist';
        return errorResponse(error, 404, res);
      }

      const costForShipping = parseFloat(shippingExists.shipping_cost);
      const cart = await models.ShoppingCart.findAll({
        where: { cart_id: cartId },
        include: [{
          model: models.Product,
          attributes: { exclude: ['createdAt', 'updatedAt'], },
        }]
      });

      let subTotalPrices = 0;
      let productsDiscount = 0;

      await Promise.all(cart.map(async (product) => {
        const salesDiscount = parseFloat(product.Product.discounted_price);
        const salesPrice = parseFloat(product.quantity * product.Product.price);
        subTotalPrices += salesPrice;
        productsDiscount += salesDiscount;
      }));

      const totalPrice = subTotalPrices - productsDiscount;
      const purchasePrice = Math.round((totalPrice + costForShipping) * 100);

      return CheckoutController.checkout(req, res, purchasePrice, shippingExists.shipping_id, stripeEmail, stripeToken, cartId);
    } catch (error) { /* istanbul ignore next */
      return errorResponse(error, 500, res);
    }
  }

  /**
   * @description query to get all orders for a logged in user
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @memberof CheckoutController
   */
  static async getOrders(req, res) {
    const userId = req.user;
    try {
      const orders = await models.Order.findAll({
        where: { customer_id: userId },
        include: [{
          model: models.Product,
          attributes: { exclude: ['createdAt', 'updatedAt'], },
        }]
      });
      
      if (orders.length !== 0) {
        const orderValues = await Promise.all(orders.map(async (product) => {
          const attributesArray = product.attributes.split(',');
          const color = attributesArray[0];
          const size = attributesArray[1];

          return {
            id: product.order_id,
            user: product.customer_id,
            quantity: product.quantity,
            totalAmount: product.total_amount,
            status: product.status,
            color,
            size,
            comments: product.comments,
            created_on: product.created_on,
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
    } catch (error) { /* istanbul ignore next */
      return errorResponse(error, 500, res);
    }
  }

  /**
   * @description query to get all shipping regions
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @memberof CheckoutController
   */
  static async getShippingRegions(req, res) {
    try {
      const regions = await models.ShippingRegion.findAll({
        include: [{
          model: models.Shipping,
          attributes: { exclude: ['createdAt', 'updatedAt', 'shipping_region_id'], },
        }]
      });

      return res.status(200).json({
        success: true,
        message: 'Regions succesfully retrieved',
        regions
      });
    } catch (error) { /* istanbul ignore next */
      return errorResponse(error, 500, res);
    }
  }
}

export default CheckoutController;
