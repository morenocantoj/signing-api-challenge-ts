import { Device } from '../../../../devices/domain/Device'
import { SignatureAlgorithm } from '../../../../signers/domain/SignatureAlgorithm'

export class DeviceResponseDTO {
  id!: string
  signature_algorithm!: SignatureAlgorithm
  signatures_performed!: number
  label?: string

  static serialize(device: Device): DeviceResponseDTO {
    const deviceSerialized = device.serialize()

    return {
      id: deviceSerialized.id,
      signature_algorithm: deviceSerialized.signatureAlgorithm,
      signatures_performed: deviceSerialized.signaturesPerformed,
      label: deviceSerialized.label,
    }
  }
}
