import { DomainError, ErrorCategory } from './DomainError'

export class ValidationError extends DomainError {
  constructor(field?: string) {
    const message = field ? `${field} has not a valid value` : 'A validation error has ocurred'

    super(message, ErrorCategory.BAD_REQUEST)
  }
}
