import { hash, compare } from 'bcrypt';
import models from '../../database/models';
import { generateToken } from '../../helpers/generateToken';
import { trimData } from '../../helpers/trimData';

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
      throw new Error('Server error');
    }
  }

  static async userLogin(req, res) {
    const { email, password } = req.body;

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
      throw new Error('Server error');
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
        return res.status(404).json({
          success: false,
          message: 'User does not exist'
        });
      }
      return res.status(200).json({
        success: true,
        message: 'User\'s profile succesfully retrieved',
        user
      });
    } catch (error) {
      throw new Error('Server error');
    }
  }

  static async updateProfile(req, res) {
    const userId = req.user;
    const {
      firstName, lastName, address, city, region, country, phone
    } = req.body;
    try {
      const user = await models.User.findOne({
        where: { id: userId },
        attributes: { exclude: ['password'] }
      });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User does not exist'
        });
      }
      const userUpdateData = {
        firstName: firstName || (user.firstName || ''),
        lastName: lastName || (user.lastName || ''),
        address: address || (user.address || ''),
        city: city || (user.city || ''),
        region: region || (user.region || ''),
        country: country || (user.country || ''),
        phone: phone || (user.phone || ''),
      };
      await trimData(userUpdateData);
      const updatedUser = await user.update(userUpdateData);
      return res.status(200).json({
        success: true,
        message: 'User profile succesfully updated',
        updatedUser
      });
    } catch (error) {
      throw new Error('Server error');
    }
  }
}

export default UserController;
