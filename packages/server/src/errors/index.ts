export abstract class AppError extends Error {
  abstract readonly statusCode: number;
  abstract readonly code: string;

  constructor(message: string) {
    super(message);
  }
}

export class CpfAlreadyExistsError extends AppError {
  readonly statusCode = 409;
  readonly code = "CPF_TAKEN";
  constructor() {
    super("CPF already exists");
  }
}

export class EmailAlreadyExistsError extends AppError {
  readonly statusCode = 409;
  readonly code = "EMAIL_TAKEN";
  constructor() {
    super("Email already exists");
  }
}

export class ValidationError extends AppError {
  readonly statusCode = 400;
  readonly code = "VALIDATION_ERROR";
}
