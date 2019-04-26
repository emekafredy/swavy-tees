import models from '../../database/models';
import { errorResponse } from '../../helpers/errorResponse';
import CartInputValidator from '../../validators/cart';
import errorHandler from '../../helpers/errorHandler';

/**
 * @class CartsController
 */
class CartsController {
  /**
   * @description query to add products to a logged in user's cart
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @memberof CartsController
   */
  static async addProductToCart(req, res) {
    const userId = req.user;
    const { productId } = req.params;
    const {
      sizeId, colorId, quantity
    } = req.body;

    try {
      const errors = await CartInputValidator.validateAddProductToCart(req, res);
      if (errors) return errorHandler(res, errors, 400);

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

      await models.ShoppingCart.create(addedProduct);
      return CartsController.getShoppingCart(req, res);
    } catch (error) { /* istanbul ignore next */
      return errorResponse(error, 500, res);
    }
  }

  /**
 * @description query to get all products in the cart
 * @static
 * @param {object} req express request object
 * @param {object} res express response object
 * @memberof CartsController
 */
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
        let productsQuantity = 0;
        let subTotalPrice = 0;
        let productsDiscount = 0;

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
          productsDiscount += salesDiscount;
          subTotalPrice += salesPrice;
          productsQuantity += product.quantity;

          return {
            id: product.id,
            user: product.customerId,
            discount: salesDiscount,
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

        return res.status(200).json({
          success: true,
          message: 'cart succesfully retrieved',
          cart: cartValues,
          totalItems: productsQuantity,
          subTotalPrice,
          discount: productsDiscount,
          totalPrice: subTotalPrice - productsDiscount,
        });
      }
      const message = 'No product found in your cart';
      return errorResponse(message, 200, res);
    } catch (error) { /* istanbul ignore next */
      return errorResponse(error, 500, res);
    }
  }

  /**
   * @description query to remove products from a logged in user's cart
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @memberof CartsController
   */
  static async removeProductFromCart(req, res) {
    const userId = req.user;
    const { cartId } = req.params;
    try {
      const cartProduct = await models.ShoppingCart.findOne({
        where: { id: cartId, customerId: userId },
      });

      if (!cartProduct) {
        const error = 'Cart product not found';
        return errorResponse(error, 404, res);
      }
      await cartProduct.destroy();
      return res.status(200).json({
        success: true,
        message: 'Product successfully removed from cart',
        deletedProduct: cartProduct
      });
    } catch (error) { /* istanbul ignore next */
      return errorResponse(error, 500, res);
    }
  }

  /**
   * @description query to update a product's quantity in a logged in user's cart
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @memberof CartsController
   */
  static async updateProductQuantity(req, res) {
    const userId = req.user;
    const { cartId } = req.params;
    const { quantity } = req.body;
    
    try {
      const cartProduct = await models.ShoppingCart.findOne({
        where: { id: cartId, customerId: userId },
      });

      if (!cartProduct) {
        const error = 'Cart product not found';
        return errorResponse(error, 404, res);
      }
      const newQuantity = { quantity: quantity || cartProduct.quantity };
      await cartProduct.update(newQuantity);
      return CartsController.getShoppingCart(req, res);
    } catch (error) { /* istanbul ignore next */
      return errorResponse(error, 500, res);
    }
  }

  /**
   * @description query to clearb all  products in a logged in user's cart
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @memberof CartsController
   */
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
    } catch (error) { /* istanbul ignore next */
      return errorResponse(error, 500, res);
    }
  }
}

export default CartsController;
