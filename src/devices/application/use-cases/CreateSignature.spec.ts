import { DeviceNotFoundError } from '../../domain/errors/DeviceNotFoundError'
import { DeviceRepositoryMemory } from '../../infrastructure/DeviceRepositoryMemory'
import { CreateSignature, SignatureCreateDTO } from './CreateSignature'

describe('CreateSignature', () => {
  let createSignature: CreateSignature
  let deviceRepositoryMemory: DeviceRepositoryMemory

  beforeEach(() => {
    deviceRepositoryMemory = new DeviceRepositoryMemory()
    createSignature = new CreateSignature(deviceRepositoryMemory)
  })

  it('throws an error when trying to create a signature with an unexistent device', async () => {
    const deviceId = 'unexistent-device-id'
    const dataToSign = 'data-to-sign'

    await expect(
      createSignature.execute(new SignatureCreateDTO(deviceId, dataToSign))
    ).rejects.toThrow(DeviceNotFoundError)
  })
})
