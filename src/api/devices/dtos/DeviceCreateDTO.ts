import { SignatureAlgorithm } from '../../../devices/domain/SignatureAlgorithm'

export class DeviceCreateDTO {
  public readonly signatureAlgorithm: SignatureAlgorithm
  public readonly label?: string

  constructor(signatureAlgorithm: any, label?: any) {
    if (!Object.values(SignatureAlgorithm).includes(signatureAlgorithm)) {
      throw new Error('signatureAlgorithm has not a valid value of type SignatureAlgorithm')
    }

    this.signatureAlgorithm = signatureAlgorithm
    this.label = label
  }
}
