import { ValidationError } from '../../../shared/domain/errors/ValidationError'

export class SignatureMethodNotFoundError extends ValidationError {
  constructor(signatureMethod: string) {
    super(`Signature method ${signatureMethod} is not a valid signature method`)
  }
}
