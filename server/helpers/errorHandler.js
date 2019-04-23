import { isEmpty } from 'lodash';

const errorHandler = (res, errors, statusCode) => {
  if (!isEmpty(errors)) {
    return res.status(statusCode).json({
      success: false,
      message: 'Request failed',
      errors
    });
  }
};

export default errorHandler;
