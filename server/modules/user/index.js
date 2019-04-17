import express from 'express';
import UserController from './UserController';
import UserProfileValidator from '../../middlewares/validators/user';
import AuthMiddleware from '../../middlewares/auth';

const Router = express.Router();
const { authorizeUser } = AuthMiddleware;

Router.post(
  '/users/register',
  UserProfileValidator.validateSignUp,
  UserController.registerUser
);

Router.post(
  '/users/login',
  UserProfileValidator.validateLogin,
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
  UserProfileValidator.validateProfileUpdate,
  UserController.updateProfile
);

export default Router;
