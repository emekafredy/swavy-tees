import express from 'express';
import ProductsController from './ProductsController';
import { cacheMiddleware } from '../../middlewares/cache';

const Router = express.Router();

Router.get(
  '/products',
  cacheMiddleware,
  ProductsController.getProducts
);

Router.get(
  '/product-categories',
  ProductsController.getCategories
);

Router.get(
  '/departments',
  ProductsController.getDepartments
);

Router.get(
  '/products/product/:id',
  ProductsController.getProductById
);

Router.get(
  '/products/department/:id',
  cacheMiddleware,
  ProductsController.getProductsByDepartment
);

export default Router;
