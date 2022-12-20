import { Device } from '../domain/Device'

export class DeviceRepositoryMemory {
  constructor(private readonly devices: Device[] = []) {}

  async save(device: Device): Promise<Device> {
    this.devices.push(device)

    return device
  }
}
