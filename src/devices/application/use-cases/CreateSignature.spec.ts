import { DeviceNotFoundError } from '../../domain/errors/DeviceNotFoundError'
import { DeviceRepositoryMemory } from '../../infrastructure/DeviceRepositoryMemory'
import { CreateSignature, SignatureCreateDTO } from './CreateSignature'
import { createDevice } from '../../../test/factories/createDevice'

describe('CreateSignature', () => {
  let deviceRepositoryMemory: DeviceRepositoryMemory
  let createSignature: CreateSignature

  beforeEach(() => {
    deviceRepositoryMemory = new DeviceRepositoryMemory()
    createSignature = new CreateSignature(deviceRepositoryMemory)
  })

  it('gets a signing device and returns data signed', async () => {
    const deviceId = 'device-id'
    const dataToSign = 'data-to-sign'
    const device = createDevice({ id: deviceId })
    deviceRepositoryMemory = new DeviceRepositoryMemory([device])
    createSignature = new CreateSignature(deviceRepositoryMemory)

    const dataSigned = await createSignature.execute(new SignatureCreateDTO(deviceId, dataToSign))

    expect(dataSigned).not.toBeUndefined()
  })

  it('increments device signature counter and signature history when signing data', async () => {
    const deviceId = 'device-id'
    const dataToSign = 'data-to-sign'
    const device = createDevice({ id: deviceId, signaturesPerformed: 0 })
    deviceRepositoryMemory = new DeviceRepositoryMemory([device])
    createSignature = new CreateSignature(deviceRepositoryMemory)

    const dataSigned = await createSignature.execute(new SignatureCreateDTO(deviceId, dataToSign))

    const deviceSerialized = device.serialize()
    expect(deviceSerialized.signaturesPerformed).toBeGreaterThan(0)
    const deviceSignaturesHistory = device.getSignaturesHistory()
    expect(deviceSignaturesHistory.includes(dataSigned))
  })

  it('throws an error when trying to create a signature with an unexistent device', async () => {
    const deviceId = 'unexistent-device-id'
    const dataToSign = 'data-to-sign'

    await expect(
      createSignature.execute(new SignatureCreateDTO(deviceId, dataToSign))
    ).rejects.toThrow(DeviceNotFoundError)
  })
})
