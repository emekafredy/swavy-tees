import express from 'express';
import CartsController from './CartsController';
import AuthMiddleware from '../../middlewares/auth';
import CartInputValidator from '../../middlewares/validators/cart';

const Router = express.Router();
const { authorizeUser } = AuthMiddleware;
const { validateAddProductToCart, checkProductDuplicate } = CartInputValidator;

Router.post(
  '/shopping-cart/:productId',
  authorizeUser,
  validateAddProductToCart,
  checkProductDuplicate,
  CartsController.addProductToCart
);

Router.get(
  '/shopping-cart',
  authorizeUser,
  CartsController.getShoppingCart
);

Router.delete(
  '/shopping-cart/:cartId',
  authorizeUser,
  CartsController.removeProductFromCart
);

Router.put(
  '/shopping-cart/:cartId',
  authorizeUser,
  CartsController.updateProductQuantity
);

Router.delete(
  '/shopping-cart',
  authorizeUser,
  CartsController.clearCart
);

export default Router;
