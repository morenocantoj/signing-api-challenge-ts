import { Device } from '../domain/Device'
import { DeviceRepository } from '../domain/DeviceRepository'

export class DeviceRepositoryMemory implements DeviceRepository {
  constructor(private readonly devices: Device[] = []) {}

  async save(device: Device): Promise<Device> {
    this.devices.push(device)

    return device
  }

  async find(deviceId: string): Promise<Device | undefined> {
    return this.devices.find(device => device.getId() === deviceId)
  }
}
