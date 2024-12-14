import { BadRequestException, ValidationError } from '@nestjs/common';

type ErrorType = Record<string, any[] | { constraints: any; children: any }>;

export const exceptionFactory = (errors: ValidationError[]): BadRequestException => {
  const formatErrors = (validationErrors: ValidationError[]): ErrorType => {
    return validationErrors.reduce((acc: ErrorType, error) => {
      const constraints = Object.values(error.constraints || {});
      const children = error.children?.length ? formatErrors(error.children) : null;

      acc[error.property] = children ? { constraints, children } : constraints;
      return acc;
    }, {});
  };

  const formattedErrors = formatErrors(errors);

  return new BadRequestException({
    message: 'Validation error',
    error: formattedErrors,
  });
};
