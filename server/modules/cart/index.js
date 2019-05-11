import express from 'express';
import CartsController from './CartsController';

const Router = express.Router();

Router.post(
  '/shopping-cart/:productId',
  CartsController.addProductToCart
);

Router.get(
  '/shopping-cart/:cartId',
  CartsController.getShoppingCart
);

Router.delete(
  '/shopping-cart/:cartId/:id',
  CartsController.removeProductFromCart
);

Router.put(
  '/shopping-cart/:cartId/:id',
  CartsController.updateProductQuantity
);

Router.delete(
  '/shopping-cart/:cartId',
  CartsController.clearCart
);

Router.post(
  '/cart/generateId',
  CartsController.generateCartId
);

export default Router;
