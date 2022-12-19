import { generateId } from '../../shared/domain/generateId'
import { SignatureAlgorithm } from './SignatureAlgorithm'

type DeviceAttributes = {
  id: string
  signatureAlgorithm: SignatureAlgorithm
  signaturesPerformed: number
  label?: string
}

export class Device {
  private static MIN_SIGNATURES_PERFORMED = 0
  private id: string
  private signatureAlgorithm: SignatureAlgorithm
  private signaturesPerformed: number
  private label?: string

  constructor(attributes: DeviceAttributes) {
    if (attributes.signaturesPerformed < Device.MIN_SIGNATURES_PERFORMED) {
      throw new Error(`Signatures performed can be less than ${Device.MIN_SIGNATURES_PERFORMED}`)
    }

    this.id = attributes.id
    this.signatureAlgorithm = attributes.signatureAlgorithm
    this.signaturesPerformed = attributes.signaturesPerformed
    this.label = attributes.label
  }

  static create(
    newDeviceAttributes: Pick<DeviceAttributes, 'label' | 'signatureAlgorithm'>
  ): Device {
    return new Device({
      id: generateId(),
      signatureAlgorithm: newDeviceAttributes.signatureAlgorithm,
      signaturesPerformed: 0,
      label: newDeviceAttributes.label,
    })
  }

  serialize() {
    return {
      id: this.id,
      signatureAlgorithm: this.signatureAlgorithm,
      signaturesPerformed: this.signaturesPerformed,
      label: this.label,
    }
  }
}
