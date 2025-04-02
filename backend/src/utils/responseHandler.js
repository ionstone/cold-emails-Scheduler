export class ResponseHandler {
  static success(res, data, message = 'Success', statusCode = 200) {
    return res.status(statusCode).json({
      status: 'success',
      message,
      data
    });
  }

  static error(res, error, statusCode = 500) {
    return res.status(statusCode).json({
      status: 'error',
      message: error.message || 'Internal server error'
    });
  }
} 