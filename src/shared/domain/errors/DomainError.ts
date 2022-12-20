export enum ErrorCategory {
  BAD_REQUEST = 'BAD_REQUEST',
  UNKNOWN = 'UNKNOWN',
}

export class DomainError extends Error {
  constructor(message: string, readonly category: ErrorCategory = ErrorCategory.UNKNOWN) {
    super(message)
  }
}
