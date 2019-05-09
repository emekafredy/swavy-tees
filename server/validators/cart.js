import { isEmpty } from 'lodash';
import { errorResponse } from '../helpers/errorResponse';
import models from '../database/models';

class CartInputValidator {
  static async validateAddProductToCart(req, res) {
    try {
      const errors = {};
      const {
        sizeId, colorId, quantity
      } = req.body;

      if (!sizeId) {
        errors.sizeId = 'Please select your preferred size.';
      }
      
      if (!colorId) {
        errors.colorId = 'Please select your preferred color.';
      }

      if (!quantity) {
        errors.colorId = 'Please provide a specified quantity.';
      }
      if (!isEmpty(errors)) return errors;
    } catch (error) { /* istanbul ignore next */
      errorResponse(error, 500, res);
    }
  }

  static async checkItemDuplicate(req, res, cartId, attributesArray) {
    const { productId } = req.params;
    try {
      const errors = {};

      // Check for duplicate items in cart
      const existingProduct = await models.ShoppingCart.findOne({
        where: {
          cart_id: cartId,
          product_id: productId,
          attributes: attributesArray.toString()
        }
      });

      if (existingProduct) {
        errors.colorId = 'You already have this product in your cart';
      }
      if (!isEmpty(errors)) return errors;
    } catch (error) { /* istanbul ignore next */
      errorResponse(error, 500, res);
    }
  }
}

export default CartInputValidator;
