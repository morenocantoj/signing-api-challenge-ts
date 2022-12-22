import { Device } from '../domain/Device'
import { DeviceRepository } from '../domain/DeviceRepository'

export class DeviceRepositoryMemory implements DeviceRepository {
  constructor(private readonly devices: Device[] = []) {}

  async save(device: Device): Promise<Device> {
    let storedDevice = await this.find(device.getId())
    if (!storedDevice) {
      this.devices.push(device)
      return device
    }

    storedDevice = device
    return storedDevice
  }

  async find(deviceId: string): Promise<Device | undefined> {
    return this.devices.find(device => device.getId() === deviceId)
  }
}
