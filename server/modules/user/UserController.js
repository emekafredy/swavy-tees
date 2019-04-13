import { hash, compare } from 'bcrypt';
import models from '../../database/models';
import { generateToken } from '../../helpers/generateToken';
import { trimData } from '../../helpers/trimData';
import { errorResponse } from '../../helpers/errorResponse';

class UserController {
  static async registerUser(req, res) {
    const {
      firstName, lastName, email, password
    } = req.body;
    const hashedPass = await hash(password, 10);

    const newUser = {
      firstName, lastName, email, password: hashedPass
    };

    try {
      await trimData(newUser);
      const user = await models.User.create(newUser);
      const token = await generateToken(user);
      return res.status(201).json({
        success: true,
        message: 'Successful user registeration',
        token
      });
    } catch (error) {
      return errorResponse(error, 500, res);
    }
  }

  static async userLogin(req, res) {
    const { email, password } = req.body;
    try {
      const user = await models.User.findOne({
        where: { email }
      });
  
      const validPassword = await compare(password, user.password);
      if (!user || !validPassword) {
        return res.status(400).json({
          success: false,
          message: 'Email or password is incorrect',
        });
      }
  
      const token = await generateToken(user);
      return res.status(200).json({
        success: true,
        message: 'Successful Login',
        token
      });
    } catch (error) {
      return errorResponse(error, 500, res);
    }
  }

  static async getUsers(req, res) {
    try {
      const users = await models.User.findAll();
      return res.status(200).json({
        success: true,
        message: 'Users succesfully retrieved',
        users
      });
    } catch (error) {
      return errorResponse(error, 500, res);
    }
  }

  static async getUser(req, res) {
    const userId = req.user;
    try {
      const user = await models.User.findOne({
        where: { id: userId },
        attributes: { exclude: ['password'] }
      });
      if (!user) {
        const error = 'User does not exist';
        return errorResponse(error, 404, res);
      }
      return res.status(200).json({
        success: true,
        message: 'User\'s profile succesfully retrieved',
        user
      });
    } catch (error) {
      return errorResponse(error, 500, res);
    }
  }

  static async updateProfile(req, res) {
    const userId = req.user;
    const {
      firstName, lastName, address1, address2, city, region, postalCode, country, dayPhone, eveningPhone, mobilePhone
    } = req.body;
    try {
      const user = await models.User.findOne({
        where: { id: userId },
        attributes: { exclude: ['password'] }
      });
      if (!user) {
        const error = 'User does not exist';
        return errorResponse(error, 404, res);
      }
      const userUpdateData = {
        firstName: firstName || (user.firstName || ''),
        lastName: lastName || (user.lastName || ''),
        address1: address1 || (user.address1 || ''),
        address2: address2 || (user.address2 || ''),
        city: city || (user.city || ''),
        region: region || (user.region || ''),
        postalCode: postalCode || (user.postalCode || ''),
        country: country || (user.country || ''),
        dayPhone: dayPhone || (user.dayPhone || ''),
        eveningPhone: eveningPhone || (user.eveningPhone || ''),
        mobilePhone: mobilePhone || (user.mobilePhone || ''),
      };
      await trimData(userUpdateData);
      const updatedUser = await user.update(userUpdateData);
      return res.status(200).json({
        success: true,
        message: 'User profile succesfully updated',
        updatedUser
      });
    } catch (error) {
      return errorResponse(error, 500, res);
    }
  }
}

export default UserController;
