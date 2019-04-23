import express from 'express';
import UserController from './UserController';
import AuthMiddleware from '../../middlewares/auth';
// import { redisMiddleware } from '../../middlewares/cache';

const Router = express.Router();
const { authorizeUser } = AuthMiddleware;

Router.post(
  '/users/register',
  UserController.registerUser
);

Router.post(
  '/users/login',
  UserController.userLogin
);

Router.get(
  '/user',
  authorizeUser,
  UserController.getUser
);
 
Router.put(
  '/user',
  authorizeUser,
  UserController.updateProfile
);

export default Router;
