import express from 'express';
import ProductsController from './ProductsController';

const Router = express.Router();

Router.get(
  '/products',
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
  ProductsController.getProductsByDepartment
);

export default Router;
