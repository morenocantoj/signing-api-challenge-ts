import { DeviceRepository } from '../domain/DeviceRepository'
import { DeviceRepositoryMemory } from './DeviceRepositoryMemory'

export const devicesRepository: DeviceRepository = new DeviceRepositoryMemory()
