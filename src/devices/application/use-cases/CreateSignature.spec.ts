import { DeviceNotFoundError } from '../../domain/errors/DeviceNotFoundError'
import { DeviceRepositoryMemory } from '../../infrastructure/DeviceRepositoryMemory'
import { CreateSignature } from './CreateSignature'
import { createDevice } from '../../../test/factories/createDevice'
import { SignatureCreateDTO } from '../../../api/v1/devices/dtos/SignatureCreateDTO'
import { createSignature } from '../../../test/factories/createSignature'

describe('CreateSignature', () => {
  let deviceRepositoryMemory: DeviceRepositoryMemory
  let createSignatureUseCase: CreateSignature

  beforeEach(() => {
    deviceRepositoryMemory = new DeviceRepositoryMemory()
    createSignatureUseCase = new CreateSignature(deviceRepositoryMemory)
  })

  it('gets a signing device and returns data signed', async () => {
    const deviceId = 'device-id'
    const dataToSign = 'data-to-sign'
    const device = createDevice({ id: deviceId })
    deviceRepositoryMemory = new DeviceRepositoryMemory([device])
    createSignatureUseCase = new CreateSignature(deviceRepositoryMemory)

    const dataSigned = await createSignatureUseCase.execute(
      deviceId,
      new SignatureCreateDTO(dataToSign)
    )

    expect(dataSigned).not.toBeUndefined()
  })

  it('increments device signature counter and signature history when signing data on a fresh device', async () => {
    const deviceId = 'device-id'
    const dataToSign = 'data-to-sign'
    const device = createDevice({ id: deviceId, signaturesHistory: [] })
    deviceRepositoryMemory = new DeviceRepositoryMemory([device])
    createSignatureUseCase = new CreateSignature(deviceRepositoryMemory)

    const dataSigned = await createSignatureUseCase.execute(
      deviceId,
      new SignatureCreateDTO(dataToSign)
    )

    const deviceSerialized = device.serialize()
    expect(deviceSerialized.signaturesPerformed).toBeGreaterThan(0)
    const lastSignature = device.getLastSignature()
    expect(lastSignature).toBe(dataSigned)
  })

  it('increments device signature counter and signature history when signing data on a device', async () => {
    const deviceId = 'device-id'
    const dataToSign = 'data-to-sign'
    const device = createDevice({ id: deviceId, signaturesHistory: [createSignature()] })
    deviceRepositoryMemory = new DeviceRepositoryMemory([device])
    createSignatureUseCase = new CreateSignature(deviceRepositoryMemory)

    const dataSigned = await createSignatureUseCase.execute(
      deviceId,
      new SignatureCreateDTO(dataToSign)
    )

    const deviceSerialized = device.serialize()
    expect(deviceSerialized.signaturesPerformed).toBe(2)
    const lastSignature = device.getLastSignature()
    expect(lastSignature).toBe(dataSigned)
  })

  it('throws an error when trying to create a signature with an unexistent device', async () => {
    const deviceId = 'unexistent-device-id'
    const dataToSign = 'data-to-sign'

    await expect(
      createSignatureUseCase.execute(deviceId, new SignatureCreateDTO(dataToSign))
    ).rejects.toThrow(DeviceNotFoundError)
  })
})
