import { AppError } from '../utils/AppError.js';

export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ');
      return next(new AppError(errorMessage, 400));
    }
    next();
  };
};

export const validateSequence = (req, res, next) => {
  const { nodes, edges } = req.body;

  if (!nodes || !Array.isArray(nodes)) {
    throw new AppError('Invalid nodes data', 400);
  }

  if (!edges || !Array.isArray(edges)) {
    throw new AppError('Invalid edges data', 400);
  }

  next();
}; 