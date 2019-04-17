import errorHandler from '../../helpers/errorHandler';
import models from '../../database/models';
import { errorResponse } from '../../helpers/errorResponse';

class CartInputValidator {
  static async validateAddProductToCart(req, res, next) {
    try {
      const errors = {};
      const {
        quantity, sizeId, colorId
      } = req.body;
      if (!quantity) {
        errors.quantity = 'Product quantity is required.';
      }
    
      if (!sizeId) {
        errors.sizeId = 'Please enter your preferred size.';
      }
      
      if (!colorId) {
        errors.colorId = 'Please enter your preferred color.';
      }

      errorHandler(res, errors, 400, next);
    } catch (error) { /* istanbul ignore next */
      errorResponse(error, 500, res);
    }
  }

  static async checkProductDuplicate(req, res, next) {
    const userId = req.user;
    const { productId } = req.params;
    const { sizeId, colorId } = req.body;
    try {
      const existingProduct = await models.ShoppingCart.findOne({
        where: {
          productId,
          customerId: userId,
          colorId,
          sizeId
        }
      });
      if (existingProduct) {
        return res.status(409).json({
          success: false,
          error: 'You already have this product in your cart',
        });
      }
      return next();
    } catch (error) { /* istanbul ignore next */
      errorResponse(error, 500, res);
    }
  }
}

export default CartInputValidator;
