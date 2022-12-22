import { SignatureCreateDTO } from '../../../api/v1/devices/dtos/SignatureCreateDTO'
import { DeviceRepository } from '../../domain/DeviceRepository'
import { findDeviceByIdOrError } from '../../domain/services/findDeviceById'

export class CreateSignature {
  constructor(private readonly deviceRepository: DeviceRepository) {}

  async execute(deviceId: string, signatureCreateDTO: SignatureCreateDTO): Promise<string> {
    const device = await findDeviceByIdOrError(this.deviceRepository, deviceId)

    const dataSigned = device.signData(signatureCreateDTO.data)
    await this.deviceRepository.save(device)

    return dataSigned
  }
}
