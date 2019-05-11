import uniqid from 'uniqid';

import models from '../../database/models';
import { errorResponse } from '../../helpers/errorResponse';
import CartInputValidator from '../../validators/cart';
import errorHandler from '../../helpers/errorHandler';
import { getAttributes } from '../../helpers/getAttributes';

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
    const { productId } = req.params;
    const {
      sizeId, colorId, quantity, cartId
    } = req.body;

    try {
      let errors = await CartInputValidator.validateAddProductToCart(req, res);
      if (errors) return errorHandler(res, errors, 400);

      const product = await models.Product.findOne({
        where: { product_id: productId },
        include: [{
          model: models.AttributeValue,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          through: { attributes: [] },
          include: [{
            model: models.Attribute,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          }]
        }]
      });

      if (!product) {
        const error = 'Product not found';
        return errorResponse(error, 404, res);
      }


      const { colors, sizes } = await getAttributes(product);
      const foundColor = colors.find(color => color.attribute_value_id === colorId);
      const foundSize = sizes.find(size => size.attribute_value_id === sizeId);

      if (!foundColor || !foundSize) {
        const error = 'We do not have your selected size or color for this product at the moment';
        return errorResponse(error, 404, res);
      }

      const attributesArray = [];
      await attributesArray.push(foundColor.value, foundSize.value);

      errors = await CartInputValidator.checkItemDuplicate(req, res, cartId, attributesArray);
      if (errors) return errorHandler(res, errors, 409);

      const addedProduct = {
        product_id: productId,
        quantity,
        cart_id: cartId,
        added_on: new Date(),
        attributes: attributesArray.toString(),
      };

      await models.ShoppingCart.create(addedProduct);
      return CartsController.getShoppingCart(req, res, cartId);
    } catch (error) { /* istanbul ignore next */
      return errorResponse(error, 500, res);
    }
  }

  /**
 * @description query to generate a cart id
 * @static
 * @param {object} req express request object
 * @param {object} res express response object
 * @memberof CartsController
 */
  static async generateCartId(req, res) {
    try {
      const uniqueId = uniqid();
      return res.status(201).json({ success: true, cartId: uniqueId });
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
  static async getShoppingCart(req, res, cartIdParam) {
    try {
      const { cartId } = req.params;

      const cart = await models.ShoppingCart.findAll({
        where: { cart_id: cartId || cartIdParam },
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
          const attributesArray = product.attributes.split(',');
          const color = attributesArray[0];
          const size = attributesArray[1];

          const salesDiscount = product.Product.discounted_price > 0 ? parseFloat((product.Product.price - product.Product.discounted_price) * product.quantity) : 0;

          const salesPrice = parseFloat(product.quantity * product.Product.price);
          productsDiscount += salesDiscount;
          subTotalPrice += salesPrice;
          productsQuantity += product.quantity;
          const productTotalPrice = product.Product.discounted_price > 0 ? parseFloat(product.quantity * product.Product.discounted_price).toFixed(2)
            : parseFloat(product.quantity * product.Product.price).toFixed(2);

          return {
            id: product.item_id,
            cartId: product.cart_id,
            discount: salesDiscount,
            quantity: product.quantity,
            color,
            size,
            product: {
              name: product.Product.name,
              price: product.Product.price,
              thumbnail: product.Product.thumbnail,
              productTotalPrice,
              productDiscount: product.Product.discounted_price
            }
          };
        }));

        return res.status(200).json({
          success: true,
          message: 'cart succesfully retrieved',
          cart: cartValues,
          totalItems: productsQuantity,
          subTotalPrice: subTotalPrice.toFixed(2),
          discount: productsDiscount.toFixed(2),
          totalPrice: (subTotalPrice - productsDiscount).toFixed(2),
        });
      }

      const message = 'No product found in your cart';
      return res.status(200).json({
        success: true, message, cart
      });
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
    const { id, cartId } = req.params;
    try {
      const cartProduct = await models.ShoppingCart.findOne({
        where: { item_id: id, cart_id: cartId },
      });

      if (!cartProduct) {
        const error = 'Cart product not found';
        return errorResponse(error, 404, res);
      }
      await cartProduct.destroy();
      return CartsController.getShoppingCart(req, res);
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
    const { id, cartId } = req.params;
    const { quantity } = req.body;
    
    try {
      const cartProduct = await models.ShoppingCart.findOne({
        where: { item_id: id, cart_id: cartId },
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
    const { cartId } = req.params;
    try {
      const cart = await models.ShoppingCart.findOne({ where: { cart_id: cartId } });

      if (!cart) {
        const error = 'You have no product in your cart';
        return errorResponse(error, 404, res);
      }
      await models.ShoppingCart.destroy({ where: { cart_id: cartId } });
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
