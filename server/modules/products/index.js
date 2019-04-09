import express from 'express';
import ProductsController from './ProductsController';
// import AuthMiddleware from '../../middlewares/auth';

const Router = express.Router();
// const { authorizeUser, authorizeAdmin } = AuthMiddleware;

Router.get(
  '/products',
  ProductsController.getProducts
);

Router.get(
  '/product-categories',
  ProductsController.getCategories
);

Router.get(
  '/products/product/:id',
  ProductsController.getProductById
);

export default Router;
