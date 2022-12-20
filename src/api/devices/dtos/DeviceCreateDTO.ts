import { SignatureAlgorithm } from '../../../devices/domain/SignatureAlgorithm'
import { ValidationError } from '../../../shared/domain/errors/ValidationError'

export class DeviceCreateDTO {
  public readonly signatureAlgorithm: SignatureAlgorithm
  public readonly label?: string

  constructor(signatureAlgorithm: any, label?: any) {
    DeviceCreateDTO.isValidSignatureAlgorithm(signatureAlgorithm)
    DeviceCreateDTO.isValidLabel(label)

    this.signatureAlgorithm = signatureAlgorithm
    this.label = label
  }

  static isValidSignatureAlgorithm(value: any): value is SignatureAlgorithm {
    if (!Object.values(SignatureAlgorithm).includes(value)) {
      throw new ValidationError('signatureAlgorithm')
    }

    return true
  }

  static isValidLabel(value: any): value is string {
    if (value !== undefined && typeof value !== 'string') {
      throw new ValidationError('label')
    }

    return true
  }
}
