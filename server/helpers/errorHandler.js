import { isEmpty } from 'lodash';

const errorHandler = (res, errors, statusCode, next) => {
  if (!isEmpty(errors)) {
    return res.status(statusCode).json({
      success: false,
      message: 'Request failed',
      errors
    });
  }
  return next();
};

export default errorHandler;
