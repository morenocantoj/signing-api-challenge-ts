import { SignatureAlgorithm } from '../../domain/SignatureAlgorithm'
import { DeviceCreateDTO } from '../../../api/devices/dtos/DeviceCreateDTO'
import { CreateSignatureDevice } from './CreateSignatureDevice'
import { DeviceRepositoryMemory } from '../../infrastructure/DeviceRepositoryMemory'

describe('CreateSignatureDevice', () => {
  let createSignatureDevice: CreateSignatureDevice
  let deviceRepositoryMemory: DeviceRepositoryMemory

  beforeEach(() => {
    deviceRepositoryMemory = new DeviceRepositoryMemory()
    createSignatureDevice = new CreateSignatureDevice(deviceRepositoryMemory)
  })

  it('creates a new device', async () => {
    const label = 'a-label'
    const signatureAlgorithm = SignatureAlgorithm.RSA

    const deviceCreated = await createSignatureDevice.execute(
      new DeviceCreateDTO(signatureAlgorithm, label)
    )
    const deviceSerialized = deviceCreated.serialize()

    expect(deviceSerialized.id).not.toBeUndefined()
    expect(deviceSerialized.signatureAlgorithm).toBe(signatureAlgorithm)
    expect(deviceSerialized.label).toBe(label)
    expect(deviceSerialized.signaturesPerformed).toBe(0)
  })
})
