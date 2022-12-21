import { NotFoundError } from '../../../shared/domain/errors/NotFoundError'

export class DeviceNotFoundError extends NotFoundError {
  constructor(deviceId: string) {
    super(`Device with id ${deviceId} not found`)
  }
}
