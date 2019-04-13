import models from '../../database/models';
import { errorResponse } from '../../helpers/errorResponse';

class CartsController {
  static async addProductToCart(req, res) {
    const userId = req.user;
    const { productId } = req.params;
    const {
      quantity, sizeId, colorId
    } = req.body;

    try {
      const product = await models.Product.findOne({
        where: { id: productId },
        include: [{
          model: models.Color,
          as: 'colors',
          attributes: { exclude: ['createdAt', 'updatedAt'], },
          through: { attributes: [] }
        }, {
          model: models.Size,
          as: 'sizes',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          through: { attributes: [] }
        }]
      });

      if (!product) {
        const error = 'Product not found';
        return errorResponse(error, 404, res);
      }
      const foundColor = product.colors.find(color => color.id === colorId);
      const foundSize = product.sizes.find(size => size.id === sizeId);

      if (!foundColor || !foundSize) {
        const error = 'We do not have your selected size or color for this product at the moment';
        return errorResponse(error, 404, res);
      }
      const addedProduct = {
        productId, quantity, sizeId, colorId, customerId: userId,
      };

      const addedToCart = await models.ShoppingCart.create(addedProduct);
      return res.status(201).json({
        success: true,
        message: 'Product successfully added to cart',
        addedToCart
      });
    } catch (error) {
      return errorResponse(error, 500, res);
    }
  }

  static async getShoppingCart(req, res) {
    const userId = req.user;
    try {
      const cart = await models.ShoppingCart.findAll({
        where: { customerId: userId },
        include: [{
          model: models.Product,
          attributes: { exclude: ['createdAt', 'updatedAt'], },
        }]
      });

      if (cart.length !== 0) {
        const productsQuantity = [];
        const subTotalPrices = [];
        const productsDiscount = [];

        const cartValues = await Promise.all(cart.map(async (product) => {
          const colors = await models.Color.findAll({ where: { id: product.colorId } });
          const individualColors = await colors.map(color => ({
            color: color.value
          }));
          const sizes = await models.Size.findAll({ where: { id: product.sizeId } });
          const individualSizes = await sizes.map(size => ({
            size: size.value
          }));

          const salesDiscount = parseFloat(product.Product.discountedPrice);
          const salesPrice = parseFloat(product.quantity * product.Product.price);
          subTotalPrices.push(salesPrice);
          productsDiscount.push(salesDiscount);
          productsQuantity.push(product.quantity);
          return {
            user: product.customerId,
            quantity: product.quantity,
            color: individualColors[0].color,
            size: individualSizes[0].size,
            product: {
              name: product.Product.name,
              price: product.Product.price,
              thumbnail: product.Product.thumbnail,
              productTotalPrice: parseFloat(product.quantity * product.Product.price)
            }
          };
        }));

        const subTotal = subTotalPrices.reduce((accumulator, currentValue) => accumulator + currentValue);
        const discount = productsDiscount.reduce((accumulator, currentValue) => accumulator + currentValue);
        return res.status(200).json({
          success: true,
          message: 'cart succesfully retrieved',
          cart: cartValues,
          totalItems: productsQuantity.reduce((accumulator, currentValue) => accumulator + currentValue),
          subTotalPrice: subTotal,
          discount,
          totalPrice: subTotal - discount,
        });
      }
      const error = 'No product found in your cart';
      return errorResponse(error, 404, res);
    } catch (error) {
      return errorResponse(error, 500, res);
    }
  }

  static async removeProductFromCart(req, res) {
    const userId = req.user;
    const { cartId } = req.params;
    try {
      const cartProduct = await models.ShoppingCart.findOne({
        where: { id: cartId, customerId: userId }
      });

      if (!cartProduct) {
        const error = 'Cart product not found';
        return errorResponse(error, 404, res);
      }
      await cartProduct.destroy();
      return res.status(200).json({
        success: true,
        message: 'Product successfully removed from cart',
      });
    } catch (error) {
      return errorResponse(error, 500, res);
    }
  }

  static async updateProductQuantity(req, res) {
    const userId = req.user;
    const { cartId } = req.params;
    const { quantity } = req.body;
    try {
      const cartProduct = await models.ShoppingCart.findOne({
        where: { id: cartId, customerId: userId }
      });

      if (!cartProduct) {
        const error = 'Cart product not found';
        return errorResponse(error, 404, res);
      }
      const newQuantity = { quantity: quantity || cartProduct.quantity };
      const updatedCart = await cartProduct.update(newQuantity);
      return res.status(200).json({
        success: true,
        message: 'Product quantity successfully updated',
        updatedCart
      });
    } catch (error) {
      return errorResponse(error, 500, res);
    }
  }

  static async clearCart(req, res) {
    const userId = req.user;
    try {
      const cart = await models.ShoppingCart.findOne({ where: { customerId: userId } });

      if (!cart) {
        const error = 'You have no product in your cart';
        return errorResponse(error, 404, res);
      }

      await models.ShoppingCart.destroy({ where: { customerId: userId } });
      return res.status(200).json({
        success: true,
        message: 'Cart successfully cleared',
      });
    } catch (error) {
      return errorResponse(error, 500, res);
    }
  }
}

export default CartsController;
