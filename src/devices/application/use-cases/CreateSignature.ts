import { Device } from '../../domain/Device'
import { DeviceRepository } from '../../domain/DeviceRepository'
import { DeviceNotFoundError } from '../../domain/errors/DeviceNotFoundError'

export class SignatureCreateDTO {
  constructor(public readonly deviceId: string, public readonly data: string) {}
}

export class CreateSignature {
  constructor(private readonly deviceRepository: DeviceRepository) {}

  async execute(signatureCreateDTO: SignatureCreateDTO): Promise<string> {
    const { deviceId } = signatureCreateDTO
    const device = await this.findDeviceById(deviceId)

    const dataSigned = device.signData(signatureCreateDTO.deviceId)
    return dataSigned
  }

  private async findDeviceById(deviceId: string): Promise<Device> {
    const device = await this.deviceRepository.find(deviceId)
    if (!device) throw new DeviceNotFoundError(deviceId)

    return device
  }
}
