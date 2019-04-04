import { User } from '../../database/models'

class AuthController {
  static async getUsers(req, res) {
    try {
      const users = await User.findAll();
      return res.status(200).json({
        success: true,
        message: 'Users succesfully retrieved',
        users
      });
    } catch(error) {
      throw new Error('Server error');
    }
  }
}

export default AuthController;
