import userRouter from './user';
import productsRouter from './products';
import cartRouter from './cart';

const apiPrefix = '/api';
const routes = [
  userRouter,
  productsRouter,
  cartRouter
];

export default (app) => {
  routes.forEach(route => app.use(apiPrefix, route));
  return app;
};
