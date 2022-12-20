import { Device } from '../../domain/Device'
import { DeviceCreateDTO } from '../../../api/devices/dtos/DeviceCreateDTO'
import { DeviceRepository } from '../../domain/DeviceRepository'

export class CreateSignatureDevice {
  constructor(private readonly deviceRepository: DeviceRepository) {}

  async execute(deviceCreateDTO: DeviceCreateDTO): Promise<Device> {
    const device = Device.create({
      signatureAlgorithm: deviceCreateDTO.signatureAlgorithm,
      label: deviceCreateDTO.label,
    })

    return this.deviceRepository.save(device)
  }
}
