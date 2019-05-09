import express from 'express';
import CartsController from './CartsController';

const Router = express.Router();

Router.post(
  '/shopping-cart/:productId',
  CartsController.addProductToCart
);

Router.get(
  '/shopping-cart',
  CartsController.getShoppingCart
);

Router.delete(
  '/shopping-cart/:id',
  CartsController.removeProductFromCart
);

Router.put(
  '/shopping-cart/:id',
  CartsController.updateProductQuantity
);

Router.delete(
  '/shopping-cart',
  CartsController.clearCart
);

export default Router;
