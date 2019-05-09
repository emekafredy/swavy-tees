import { hash, compare } from 'bcrypt';
import models from '../../database/models';
import { generateToken } from '../../helpers/generateToken';
import { trimData } from '../../helpers/trimData';
import { errorResponse } from '../../helpers/errorResponse';
import UserProfileValidator from '../../validators/user';
import errorHandler from '../../helpers/errorHandler';

/**
 * @class UserController
 */
class UserController {
  /**
   * @description query to register a new user unto the platform
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @memberof UserController
   */
  static async registerUser(req, res) {
    const {
      name, email, password
    } = req.body;
    const hashedPass = await hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashedPass
    };

    try {
      const errors = await UserProfileValidator.validateSignUp(req);
      if (errors) return errorHandler(res, errors, 400);

      await trimData(newUser);
      const user = await models.Customer.create(newUser);
      const token = await generateToken(user);
      const userFirstName = newUser.name.split(' ')[0];
      return res.status(201).json({
        success: true,
        message: 'Successful user registeration',
        token,
        userFirstName,
      });
    } catch (error) { /* istanbul ignore next */
      return errorResponse(error, 500, res);
    }
  }

  /**
   * @description query to login already registered users
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @memberof UserController
   */
  static async userLogin(req, res) {
    const { email, password } = req.body;
    try {
      const errors = await UserProfileValidator.validateLogin(req);
      if (errors) return errorHandler(res, errors, 400);

      const user = await models.Customer.findOne({
        where: { email }
      });
  
      const validPassword = await compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({
          success: false,
          message: 'Request failed',
          errors: {
            email: 'Email or password is incorrect.'
          }
        });
      }
  
      const token = await generateToken(user);
      const userFirstName = user.name.split(' ')[0];
      return res.status(200).json({
        success: true,
        message: 'Successful Login',
        token,
        userFirstName,
      });
    } catch (error) { /* istanbul ignore next */
      return errorResponse(error, 500, res);
    }
  }

  /**
   * @description query to get an authenticated user's profile
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @memberof UserController
   */
  static async getUser(req, res) {
    const userId = req.user;
    try {
      const user = await models.Customer.findOne({
        where: { customer_id: userId },
        attributes: { exclude: ['password'] }
      });
      if (!user) { /* istanbul ignore next */
        const error = 'User does not exist';
        /* istanbul ignore next */
        return errorResponse(error, 404, res);
      }
      return res.status(200).json({
        success: true,
        message: 'User\'s profile succesfully retrieved',
        user
      });
    } catch (error) { /* istanbul ignore next */
      return errorResponse(error, 500, res);
    }
  }

  /**
   * @description query to update an authenticated user's profile
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @memberof UserController
   */
  static async updateProfile(req, res) {
    const userId = req.user;
    const {
      name, address1, address2, city, region, postalCode, country, dayPhone, eveningPhone, mobilePhone
    } = req.body;
    try {
      const user = await models.Customer.findOne({
        where: { customer_id: userId },
        attributes: { exclude: ['password'] }
      });
      if (!user) { /* istanbul ignore next */
        const error = 'User does not exist';
        /* istanbul ignore next */
        return errorResponse(error, 404, res);
      }
      
      const errors = await UserProfileValidator.validateProfileUpdate(req);
      if (errors) return errorHandler(res, errors, 400);

      const userUpdateData = {
        name: name || (user.name || ''),
        address_1: address1 || (user.address_1 || ''),
        address_2: address2 || (user.address_2 || ''),
        city: city || (user.city || ''),
        region: region || (user.region || ''),
        postal_code: postalCode || (user.postal_code || ''),
        country: country || (user.country || ''),
        day_phone: dayPhone || (user.day_phone || ''),
        evening_phone: eveningPhone || (user.evening_phone || ''),
        mobile_phone: mobilePhone || (user.mobile_phone || ''),
      };
      await trimData(userUpdateData);
      const updatedUser = await user.update(userUpdateData);
      return res.status(200).json({
        success: true,
        message: 'User profile succesfully updated',
        updatedUser
      });
    } catch (error) { /* istanbul ignore next */
      return errorResponse(error, 500, res);
    }
  }
}

export default UserController;
