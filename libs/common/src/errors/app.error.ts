import { HttpException } from '@nestjs/common/exceptions/http.exception';

export enum ErrorCode {
  SERVER = 'SERVER',
  BAD_REQUEST = 'BAD_REQUEST',
  EMPTY_BODY = 'EMPTY_BODY',
  VALIDATION = 'VALIDATION',
  ACCESS = 'ACCESS',
  NO_ANONYMOUS_ACCESS = 'NO_ANONYMOUS_ACCESS',
  BAD_ROLE = 'BAD_ROLE',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  INVALID_SESSION = 'INVALID_SESSION',
  TOKEN_NOT_SIGNED = 'TOKEN_NOT_SIGNED',
  TOKEN_VERIFY = 'TOKEN_VERIFY',
  BAD_REFRESH_TOKEN = 'BAD_REFRESH_TOKEN',
  WRONG_RESET_PASSWORD_TOKEN = 'WRONG_RESET_PASSWORD_TOKEN',
  WRONG_EMAIL_CONFIRM_TOKEN = 'WRONG_EMAIL_CONFIRM_TOKEN',
  PARSE_TOKEN = 'PARSE_TOKEN',
  SEND_EMAIL = 'SEND_EMAIL',
  ROUTE_NOT_FOUND = 'ROUTE_NOT_FOUND',
  NOT_FOUND = 'NOT_FOUND',
  UNPROCESSABLE_ENTITY = 'UNPROCESSABLE_ENTITY',
  CONFLICT = 'DUPLICATE_CONFLICT',
  DB_NOTNULL_CONFLICT = 'DB_NOTNULL_CONFLICT',
  DB = 'DB',
}

interface IErrorDetails {
  status: number;
  description: string;
}

const errorList: Record<ErrorCode, IErrorDetails> = {
  [ErrorCode.SERVER]: { status: 500, description: 'Server error occurred' },
  [ErrorCode.BAD_REQUEST]: { status: 400, description: 'Bad request' },
  [ErrorCode.EMPTY_BODY]: { status: 400, description: 'Empty body is not allowed. Please fill the body' },
  [ErrorCode.VALIDATION]: { status: 400, description: 'Validation error, invalid request' },
  [ErrorCode.ACCESS]: { status: 403, description: 'Access denied' },
  [ErrorCode.NO_ANONYMOUS_ACCESS]: { status: 403, description: 'Access denied. No anonymous access' },
  [ErrorCode.BAD_ROLE]: { status: 403, description: 'Bad role' },
  [ErrorCode.INVALID_CREDENTIALS]: { status: 403, description: 'Invalid credentials' },
  [ErrorCode.TOKEN_EXPIRED]: { status: 419, description: 'Token expired' },
  [ErrorCode.SESSION_EXPIRED]: { status: 419, description: 'Session(refresh token) expired' },
  [ErrorCode.INVALID_SESSION]: { status: 401, description: 'Invalid session. Wrong fingerprint' },
  [ErrorCode.TOKEN_NOT_SIGNED]: { status: 500, description: 'Token not signed' },
  [ErrorCode.TOKEN_VERIFY]: { status: 401, description: 'Token verify error' },
  [ErrorCode.BAD_REFRESH_TOKEN]: { status: 401, description: 'Bad Refresh token' },
  [ErrorCode.WRONG_RESET_PASSWORD_TOKEN]: { status: 401, description: 'Reset password token is not registered. Probably it already used' },
  [ErrorCode.WRONG_EMAIL_CONFIRM_TOKEN]: { status: 401, description: 'Confirm email token is not registered. Probably it already used' },
  [ErrorCode.PARSE_TOKEN]: { status: 401, description: 'Trying get data from access token. Something wrong' },
  [ErrorCode.SEND_EMAIL]: { status: 500, description: 'Send email error' },
  [ErrorCode.ROUTE_NOT_FOUND]: { status: 404, description: 'Route not found' },
  [ErrorCode.NOT_FOUND]: { status: 404, description: 'Empty response, not found' },
  [ErrorCode.UNPROCESSABLE_ENTITY]: { status: 422, description: 'Unprocessable entity' },
  [ErrorCode.CONFLICT]: { status: 409, description: 'Duplicate conflict. Resource already exists. Try to use another one' },
  [ErrorCode.DB_NOTNULL_CONFLICT]: { status: 500, description: 'Not null conflict' },
  [ErrorCode.DB]: { status: 500, description: 'Database error occurred' },
};

interface IAppErrorOptions {
  message?: string;
  error?: any;
  meta?: any;
  layer?: string;
  origin?: Error | AppError;
  entity?: string;
}

export class AppError extends HttpException {
  public readonly error: any;
  public readonly description: string;
  public readonly code: string;
  public readonly layer?: string;
  public readonly meta?: any;
  public readonly origin?: Error | AppError;
  public readonly entity?: string;

  constructor(
    public readonly errorCode: ErrorCode,
    options: IAppErrorOptions = {},
  ) {
    const errorConfig = errorList[errorCode];

    super(options.message || errorConfig.description, errorConfig.status || 500);

    this.error = options.error;
    this.description = errorConfig.description;
    this.code = `${errorCode}_ERROR`;
    this.layer = options.layer;
    this.meta = options.meta;
    this.origin = options.origin;
    this.entity = options.entity;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}
