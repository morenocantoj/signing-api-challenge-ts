import { DomainError, ErrorCategory } from './DomainError'

export class NotFoundError extends DomainError {
  constructor(message: string) {
    super(message, ErrorCategory.NOT_FOUND)
  }
}
