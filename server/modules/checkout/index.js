import express from 'express';
import CheckoutController from './CheckoutController';
import AuthMiddleware from '../../middlewares/auth';

const Router = express.Router();
const { authorizeUser } = AuthMiddleware;


Router.get(
  '/payments',
  authorizeUser,
  CheckoutController.getCheckout
);

Router.post(
  '/charge',
  authorizeUser,
  CheckoutController.makePayment
);

Router.get(
  '/orders',
  authorizeUser,
  CheckoutController.getOrders
);

Router.get(
  '/regions',
  authorizeUser,
  CheckoutController.getShippingRegions
);
export default Router;
