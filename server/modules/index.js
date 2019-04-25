import userRouter from './user';
import productsRouter from './products';
import cartRouter from './cart';
import checkoutRouter from './checkout';

const apiPrefix = '/api';
const routes = [
  userRouter,
  productsRouter,
  cartRouter,
  checkoutRouter
];

export default (app) => {
  routes.forEach(route => app.use(apiPrefix, route));

  app.get('/', (req, res) => res.status(200).json({
    message: 'SWAVY-TEES API',
  }));

  app.get(apiPrefix, (req, res) => res.status(200).json({
    message: 'Welcome to Swavy-Tees App API, Version 1',
  }));

  return app;
};
