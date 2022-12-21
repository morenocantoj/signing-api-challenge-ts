import { generateId } from '../../shared/domain/generateId'
import { Signer } from './Signer'

type DeviceAttributes = {
  id: string
  signer: Signer
  signaturesPerformed: number
  signaturesHistory: string[]
  label?: string
}

export class Device {
  private static MIN_SIGNATURES = 0
  private id: string
  private signer: Signer
  private signaturesPerformed: number
  private signaturesHistory: string[]
  private label?: string

  constructor(attributes: DeviceAttributes) {
    if (attributes.signaturesPerformed < Device.MIN_SIGNATURES) {
      throw new Error(`Signatures performed can be less than ${Device.MIN_SIGNATURES}`)
    }

    this.id = attributes.id
    this.signer = attributes.signer
    this.signaturesPerformed = attributes.signaturesPerformed
    this.signaturesHistory = attributes.signaturesHistory
    this.label = attributes.label
  }

  static create(newDeviceAttributes: Pick<DeviceAttributes, 'label' | 'signer'>): Device {
    return new Device({
      id: generateId(),
      signer: newDeviceAttributes.signer,
      signaturesPerformed: 0,
      label: newDeviceAttributes.label,
      signaturesHistory: [],
    })
  }

  serialize() {
    return {
      id: this.id,
      signatureAlgorithm: this.signer.getSignatureAlgorithm(),
      signaturesPerformed: this.signaturesPerformed,
      label: this.label,
    }
  }

  signData(data: string): string {
    const moreSecureData = this.increaseDataSecurity(data)
    const dataSigned = this.signer.signData(moreSecureData)
    this.signaturesHistory.push(dataSigned)
    this.signaturesPerformed += 1

    return dataSigned
  }

  private increaseDataSecurity(originalData: string): string {
    const rearPayload = this.signaturesHistory.at(-1) ?? Buffer.from(this.id).toString('base64')
    return [this.signaturesPerformed, originalData, rearPayload].join('_')
  }
}
