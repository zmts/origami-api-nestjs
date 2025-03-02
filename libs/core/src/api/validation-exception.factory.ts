import { BadRequestException, ValidationError } from '@nestjs/common';

import { AppError, ErrorCode } from '../errors';

type ErrorType = Record<string, any[] | { constraints: any; children: any }>;

export const validationExceptionFactory = (errors: ValidationError[]): BadRequestException => {
  const formatErrors = (validationErrors: ValidationError[]): ErrorType => {
    return validationErrors.reduce((acc: ErrorType, error) => {
      const constraints = Object.values(error.constraints || {});
      const children = error.children?.length ? formatErrors(error.children) : null;

      acc[error.property] = children ? { constraints, children } : constraints;
      return acc;
    }, {});
  };

  const formattedErrors = formatErrors(errors);

  return new AppError(ErrorCode.VALIDATION, { error: formattedErrors });
};
