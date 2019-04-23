import { isEmpty } from 'lodash';
import models from '../database/models';
import { errorResponse } from '../helpers/errorResponse';

class CartInputValidator {
  static async validateAddProductToCart(req, res) {
    const userId = req.user;
    const { productId } = req.params;
    try {
      const errors = {};
      const {
        sizeId, colorId
      } = req.body;

      if (!sizeId) {
        errors.sizeId = 'Please enter your preferred size.';
      }
      
      if (!colorId) {
        errors.colorId = 'Please enter your preferred color.';
      }

      const existingProduct = await models.ShoppingCart.findOne({
        where: {
          productId,
          customerId: userId,
          colorId,
          sizeId
        }
      });
      if (existingProduct) {
        errors.product = 'You already have this product in your cart';
      }

      if (!isEmpty(errors)) return errors;
    } catch (error) { /* istanbul ignore next */
      errorResponse(error, 500, res);
    }
  }
}

export default CartInputValidator;
