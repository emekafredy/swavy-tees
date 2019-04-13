import validator from 'validator';
import errorHandler from '../../helpers/errorHandler';
import models from '../../database/models';

class UserProfileValidator {
  static async validateSignUp(req, res, next) {
    try {
      const errors = {};
      const {
        firstName, lastName, email, password
      } = req.body;
  
      if (!firstName || validator.isEmpty(firstName)) {
        errors.firstName = 'First name is required.';
      } else if (!validator.isLength(firstName, { min: 3, max: 200 })) {
        errors.firstName = 'Your first name must be between 3 and 200 characters.';
      }
    
      if (!lastName || validator.isEmpty(lastName)) {
        errors.lastName = 'Last name is required.';
      } else if (!validator.isLength(lastName, { min: 3, max: 200 })) {
        errors.lastName = 'Your last name must be between 3 and 200 characters.';
      }
      
      if (!email || validator.isEmpty(email)) {
        errors.email = 'Email address is required.';
      } else if (!validator.isEmail(email)) {
        errors.email = 'Please provide a valid email address.';
      }
      
      if (!password || validator.isEmpty(password)) {
        errors.password = 'Password is required.';
      } else if (!validator.isLength(password, { min: 6, max: 20 })) {
        errors.password = 'Your password must be between 6 and 20 characters.';
      }

      const registeredEmail = await models.User.findOne({
        where: { email },
        attributes: ['email']
      });

      if (registeredEmail) {
        errors.email = 'Email already exists.';
      }

      errorHandler(res, errors, 400, next);
    } catch (error) {
      throw new Error('Server error');
    }
  }

  static async validateLogin(req, res, next) {
    const errors = {};
    const { email, password } = req.body;

    if (!email || validator.isEmpty(email)) {
      errors.email = 'Email address is required.';
    }

    if (!password || validator.isEmpty(password)) {
      errors.password = 'Password is required.';
    }

    errorHandler(res, errors, 400, next);
  }

  static async validateProfileUpdate(req, res, next) {
    try {
      const errors = {};
      const {
        firstName, lastName, address1, address2, city, region, postalCode, country, dayPhone, eveningPhone, mobilePhone
      } = req.body;

      if (firstName && !validator.isLength(firstName, { min: 3, max: 200 })) {
        errors.firstName = 'Your first name must be between 3 and 200 characters.';
      }
    
      if (lastName && !validator.isLength(lastName, { min: 3, max: 200 })) {
        errors.lastName = 'Your last name must be between 3 and 200 characters.';
      }

      if (address1 && !validator.isLength(address1, { min: 3, max: 200 })) {
        errors.address1 = 'Your address should have between 10 and 300 characters.';
      }

      if (address2 && !validator.isLength(address2, { min: 3, max: 200 })) {
        errors.address2 = 'Your address should have between 10 and 300 characters.';
      }

      if (city && !validator.isLength(city, { min: 3, max: 200 })) {
        errors.city = 'Your city should have between 3 and 200 characters.';
      }

      if (region && !validator.isLength(region, { min: 3, max: 200 })) {
        errors.region = 'Your region should have between 3 and 200 characters.';
      }

      if (postalCode && !validator.isLength(postalCode, { max: 100 })) {
        errors.postalCode = 'Your postal code should not be more than 100 characters.';
      }

      if (country && !validator.isLength(country, { min: 3, max: 200 })) {
        errors.country = 'Your country name should be between 3 and 200 characters.';
      }

      if (dayPhone && !validator.isLength(dayPhone, { min: 10, max: 200 })) {
        errors.dayPhone = 'Please enter a valid phone number';
      }
      if (eveningPhone && !validator.isLength(eveningPhone, { min: 10, max: 200 })) {
        errors.eveningPhone = 'Please enter a valid phone number';
      }
      if (mobilePhone && !validator.isLength(mobilePhone, { min: 10, max: 200 })) {
        errors.mobilePhone = 'Please enter a valid phone number';
      }

      errorHandler(res, errors, 400, next);
    } catch (error) {
      throw new Error('Server error');
    }
  }
}

export default UserProfileValidator;
