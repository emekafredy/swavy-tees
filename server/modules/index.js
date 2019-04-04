import userRouter from './user';

const apiPrefix = '/api';
const routes = [
  userRouter
];

export default (app) => {
  routes.forEach(route => app.use(apiPrefix, route));
  return app;
};
