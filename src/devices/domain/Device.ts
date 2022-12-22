import { generateId } from '../../shared/domain/generateId'
import { Signer } from '../../signers/domain/Signer'

type DeviceAttributes = {
  id: string
  signer: Signer
  signaturesHistory: string[]
  label?: string
}

export class Device {
  private static MIN_SIGNATURES = 0
  private id: string
  private signer: Signer
  private signaturesHistory: string[]
  private label?: string

  constructor(attributes: DeviceAttributes) {
    this.id = attributes.id
    this.signer = attributes.signer
    this.signaturesHistory = attributes.signaturesHistory
    this.label = attributes.label
  }

  static create(newDeviceAttributes: Pick<DeviceAttributes, 'label' | 'signer'>): Device {
    return new Device({
      id: generateId(),
      signer: newDeviceAttributes.signer,
      label: newDeviceAttributes.label,
      signaturesHistory: [],
    })
  }

  serialize() {
    return {
      id: this.id,
      signatureAlgorithm: this.signer.getSignatureAlgorithm(),
      signaturesPerformed: this.getSignaturesHistory().length,
      label: this.label,
    }
  }

  getId(): string {
    return this.id
  }

  getSignaturesHistory(): string[] {
    return this.signaturesHistory
  }

  getLastSignature(): string | undefined {
    return this.signaturesHistory.at(-1)
  }

  getSignaturesPerformed(): number {
    return this.getSignaturesHistory().length
  }

  signData(data: string): string {
    const moreSecureData = this.increaseDataSecurity(data)
    const dataSigned = this.signer.signData(moreSecureData)
    this.signaturesHistory.push(dataSigned)

    return dataSigned
  }

  private increaseDataSecurity(originalData: string): string {
    const rearPayload = this.getLastSignature() ?? Buffer.from(this.id).toString('base64')
    return [this.getSignaturesPerformed(), originalData, rearPayload].join('_')
  }
}
