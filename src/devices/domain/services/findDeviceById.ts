import { Device } from '../Device'
import { DeviceRepository } from '../DeviceRepository'
import { DeviceNotFoundError } from '../errors/DeviceNotFoundError'

export async function findDeviceByIdOrError(
  deviceRepository: DeviceRepository,
  deviceId: string
): Promise<Device> {
  const device = await deviceRepository.find(deviceId)
  if (!device) throw new DeviceNotFoundError(deviceId)

  return device
}
