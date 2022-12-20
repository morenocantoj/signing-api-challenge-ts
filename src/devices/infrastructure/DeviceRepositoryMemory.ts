import { Device } from '../domain/Device'
import { DeviceRepository } from '../domain/DeviceRepository'

export class DeviceRepositoryMemory implements DeviceRepository {
  constructor(private readonly devices: Device[] = []) {}

  async save(device: Device): Promise<Device> {
    this.devices.push(device)

    return device
  }
}
