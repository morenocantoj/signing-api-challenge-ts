import { Device } from './Device'

export interface DeviceRepository {
  save(device: Device): Promise<Device>
  find(deviceId: string): Promise<Device | undefined>
}
