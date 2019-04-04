import express from 'express';
import AuthController from './AuthController';

const Router = express.Router();

Router.get(
  '/users',
  AuthController.getUsers
);

export default Router;
