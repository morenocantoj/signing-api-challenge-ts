import { DeviceRepository } from '../../domain/DeviceRepository'
import { findDeviceByIdOrError } from '../../domain/services/findDeviceById'

export class SignatureCreateDTO {
  constructor(public readonly deviceId: string, public readonly data: string) {}
}

export class CreateSignature {
  constructor(private readonly deviceRepository: DeviceRepository) {}

  async execute(signatureCreateDTO: SignatureCreateDTO): Promise<string> {
    const { deviceId } = signatureCreateDTO
    const device = await findDeviceByIdOrError(this.deviceRepository, deviceId)

    const dataSigned = device.signData(signatureCreateDTO.deviceId)
    await this.deviceRepository.save(device)

    return dataSigned
  }
}
