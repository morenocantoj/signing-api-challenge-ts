import { DeviceRepositoryMemory } from './DeviceRepositoryMemory'
import { createDevice } from '../../test/factories/createDevice'
import { Signature } from '../../signers/domain/Signature'

describe('DeviceRepositoryMemory', () => {
  let deviceRepository: DeviceRepositoryMemory

  describe('find', () => {
    it('returns device found in repository', async () => {
      const deviceId = 'device-1'
      deviceRepository = new DeviceRepositoryMemory([createDevice({ id: deviceId })])

      const device = await deviceRepository.find(deviceId)

      expect(device).toBeDefined()
    })

    it('returns undefined if no device is found', async () => {
      const deviceId = 'device-1'
      deviceRepository = new DeviceRepositoryMemory([createDevice({ id: deviceId })])

      const device = await deviceRepository.find('unexistent-id')

      expect(device).toBeUndefined()
    })
  })

  describe('save', () => {
    it('creates a new device in repository', async () => {
      const deviceId = 'device-1'
      const deviceLabel = 'device-label'
      const deviceSignaturesHistory: Signature[] = []
      const device = createDevice({
        id: deviceId,
        label: deviceLabel,
        signaturesHistory: deviceSignaturesHistory,
      })
      deviceRepository = new DeviceRepositoryMemory([])

      const deviceCreated = await deviceRepository.save(device)

      expect(deviceCreated).toBeDefined()
      const deviceCreatedSerialized = deviceCreated.serialize()
      expect(deviceCreatedSerialized.id).toBe(deviceId)
      expect(deviceCreatedSerialized.label).toBe(deviceLabel)
      expect(deviceCreatedSerialized.signaturesPerformed).toBe(deviceSignaturesHistory.length)
    })
  })
})
