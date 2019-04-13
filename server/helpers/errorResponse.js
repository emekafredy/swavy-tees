
// eslint-disable-next-line import/prefer-default-export
export const errorResponse = (error, statusCode, response) => response.status(statusCode).json({
  success: false,
  error
});
