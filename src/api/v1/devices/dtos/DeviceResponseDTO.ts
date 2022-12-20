import { Device } from '../../../../devices/domain/Device'
import { SignatureAlgorithm } from '../../../../devices/domain/SignatureAlgorithm'

export class DeviceResponseDTO {
  id!: string
  signatureAlgorithm!: SignatureAlgorithm
  signaturesPerformed!: number
  label?: string

  static serialize(device: Device): DeviceResponseDTO {
    const deviceSerialized = device.serialize()

    return {
      id: deviceSerialized.id,
      signatureAlgorithm: deviceSerialized.signatureAlgorithm,
      signaturesPerformed: deviceSerialized.signaturesPerformed,
      label: deviceSerialized.label,
    }
  }
}
