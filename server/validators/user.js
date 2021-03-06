import validator from 'validator';
import { isEmpty } from 'lodash';
import models from '../database/models';

class UserProfileValidator {
  static async validateSignUp(req) {
    try {
      const errors = {};
      const {
        name, email, password, confirmPassword
      } = req.body;
  
      if (!name || validator.isEmpty(name.trim())) {
        errors.name = 'Name is required.';
      } else if (!validator.isLength(name.trim(), { min: 3, max: 50 })) {
        errors.name = 'Name must be between 3 and 50 characters.';
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

      if (!confirmPassword || validator.isEmpty(confirmPassword)) {
        errors.confirmPassword = 'Please confirm your password.';
      } else if (confirmPassword !== password) {
        errors.confirmPassword = 'Passwords do not match.';
      }

      const registeredEmail = await models.Customer.findOne({
        where: { email },
        attributes: ['email']
      });

      if (registeredEmail) {
        errors.email = 'Email already exists.';
      }

      if (!isEmpty(errors)) return errors;
    } catch (error) { /* istanbul ignore next */
      throw new Error('Server error');
    }
  }

  static async validateLogin(req) {
    const errors = {};
    const { email, password } = req.body;

    if (!email || validator.isEmpty(email)) {
      errors.email = 'Email address is required.';
    }

    if (!password || validator.isEmpty(password)) {
      errors.password = 'Password is required.';
    }
    const user = await models.Customer.findOne({
      where: { email }
    });

    if (!user) {
      errors.password = 'Email or password is incorrect.';
    }
    if (!isEmpty(errors)) return errors;
  }

  static async validateProfileUpdate(req) {
    try {
      const errors = {};
      const {
        name, address1, address2, city, region, postalCode, country, dayPhone, eveningPhone, mobilePhone
      } = req.body;
      
      if (name && !validator.isLength(name.trim(), { min: 3, max: 50 })) {
        errors.name = 'Your name must be between 3 and 50 characters.';
      }

      if (address1 && !validator.isLength(address1, { min: 6, max: 200 })) {
        errors.address1 = 'Your address should have between 6 and 200 characters.';
      }
    
      if (address2 && !validator.isLength(address2, { min: 6, max: 200 })) {
        errors.address2 = 'Your address should have between 6 and 200 characters.';
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

      if (!isEmpty(errors)) return errors;
    } catch (error) { /* istanbul ignore next */
      throw new Error('Server error');
    }
  }
}

export default UserProfileValidator;
