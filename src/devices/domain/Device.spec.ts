import { Device } from './Device'
import { SignatureAlgorithm } from './SignatureAlgorithm'
import { SignerFake } from './SignerFake'
import { createDevice } from '../../test/factories/createDevice'

describe('Device', () => {
  let device: Device

  describe('constructor', () => {
    it('throws an error if trying to create a Device with signaturesPerformed below 0', () => {
      expect(() => {
        new Device({
          id: 'an-identifier',
          signer: new SignerFake(SignatureAlgorithm.RSA),
          signaturesPerformed: -1,
          label: 'a-label',
        })
      }).toThrowError()
    })
  })

  describe('serialize', () => {
    it('serializes a Device object', () => {
      const id = 'an-identifier'
      const label = 'a-label'
      const signatureAlgorithm = SignatureAlgorithm.RSA
      const signaturesPerformed = 47
      device = createDevice({
        id,
        label,
        signer: new SignerFake(signatureAlgorithm),
        signaturesPerformed,
      })

      const deviceSerialized = device.serialize()

      expect(deviceSerialized.id).toBe(id)
      expect(deviceSerialized.label).toBe(label)
      expect(deviceSerialized.signatureAlgorithm).toBe(signatureAlgorithm)
      expect(deviceSerialized.signaturesPerformed).toBe(signaturesPerformed)
    })
  })

  describe('create', () => {
    it('returns a new Device object with no signatures performed yet', () => {
      const label = 'a-label'
      const signatureAlgorithm = SignatureAlgorithm.RSA

      device = createDevice({ label, signer: new SignerFake(signatureAlgorithm) })

      const deviceSerialized = device.serialize()
      expect(deviceSerialized.id).not.toBeUndefined()
      expect(deviceSerialized.signatureAlgorithm).toBe(signatureAlgorithm)
      expect(deviceSerialized.signaturesPerformed).toBe(0)
      expect(deviceSerialized.label).toBe(label)
    })
  })

  describe('signData', () => {
    it('signs string data and increments signatures performed', () => {
      device = createDevice({ signaturesPerformed: 0 })
      const dataToSign = 'dataToBeSigned'

      const dataSigned = device.signData(dataToSign)

      expect(dataSigned).not.toBeUndefined()
      const deviceSerialized = device.serialize()
      expect(deviceSerialized.signaturesPerformed).toBe(1)
    })
  })
})
