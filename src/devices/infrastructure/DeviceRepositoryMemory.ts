import { Device } from '../domain/Device'
import { DeviceRepository } from '../domain/DeviceRepository'

export class DeviceRepositoryMemory implements DeviceRepository {
  constructor(private readonly devices: Device[] = []) {}

  async save(device: Device): Promise<Device> {
    const storedDeviceIndex = await this.devices.findIndex(
      deviceStored => deviceStored.getId() === device.getId()
    )
    if (storedDeviceIndex < 0) {
      this.devices.push(device)
    } else {
      this.devices[storedDeviceIndex] = device
    }

    return device
  }

  async find(deviceId: string): Promise<Device | undefined> {
    return this.devices.find(device => device.getId() === deviceId)
  }
}
