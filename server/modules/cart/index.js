import express from 'express';
import CartsController from './CartsController';
import AuthMiddleware from '../../middlewares/auth';

const Router = express.Router();
const { authorizeUser } = AuthMiddleware;

Router.post(
  '/shopping-cart/:productId',
  authorizeUser,
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
