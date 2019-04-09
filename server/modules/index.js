import userRouter from './user';
import productsRouter from './products';

const apiPrefix = '/api';
const routes = [
  userRouter,
  productsRouter
];

export default (app) => {
  routes.forEach(route => app.use(apiPrefix, route));
  return app;
};
