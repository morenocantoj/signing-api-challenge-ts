import { Device } from '../../domain/Device'
import { DeviceCreateDTO } from '../../../api/devices/dtos/DeviceCreateDTO'
import { DeviceRepositoryMemory } from '../../infrastructure/DeviceRepositoryMemory'

export class CreateSignatureDevice {
  constructor(private readonly deviceRepository: DeviceRepositoryMemory) {}

  async execute(deviceCreateDTO: DeviceCreateDTO): Promise<Device> {
    const device = Device.create({
      signatureAlgorithm: deviceCreateDTO.signatureAlgorithm,
      label: deviceCreateDTO.label,
    })

    return this.deviceRepository.save(device)
  }
}
