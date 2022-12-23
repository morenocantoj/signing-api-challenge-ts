import { Device } from './Device'
import { SignatureAlgorithm } from '../../signers/domain/SignatureAlgorithm'
import { createDevice } from '../../test/factories/createDevice'
import { SignerFake } from '../../signers/domain/SignerFake'
import { createSignature } from '../../test/factories/createSignature'

describe('Device', () => {
  let device: Device

  describe('serialize', () => {
    it('serializes a Device object', () => {
      const id = 'an-identifier'
      const label = 'a-label'
      const signatureAlgorithm = SignatureAlgorithm.RSA
      const signaturesHistory = [createSignature(), createSignature()]
      device = createDevice({
        id,
        label,
        signer: new SignerFake(signatureAlgorithm),
        signaturesHistory,
      })

      const deviceSerialized = device.serialize()

      expect(deviceSerialized.id).toBe(id)
      expect(deviceSerialized.label).toBe(label)
      expect(deviceSerialized.signatureAlgorithm).toBe(signatureAlgorithm)
      expect(deviceSerialized.signaturesPerformed).toBe(signaturesHistory.length)
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
      device = createDevice({ signaturesHistory: [] })
      const dataToSign = 'dataToBeSigned'

      const dataSigned = device.signData(dataToSign)

      expect(dataSigned).not.toBeUndefined()
      const deviceSerialized = device.serialize()
      expect(deviceSerialized.signaturesPerformed).toBe(1)
    })

    it('signs string data based in signatures counter and last signature performed', () => {
      const signaturesHistory = [createSignature()]
      device = createDevice({ signaturesHistory })
      const dataToSign = 'dataToBeSigned'

      const dataSigned = device.signData(dataToSign)

      expect(dataSigned.getContent()).toBe(`1_${dataToSign}_${signaturesHistory[0].getContent()}`)
    })

    it('signs string data based in signatures counter and device id if there are no signatures performed yet', () => {
      const id = 'an-id'
      device = createDevice({ id, signaturesHistory: [] })
      const dataToSign = 'dataToBeSigned'

      const dataSigned = device.signData(dataToSign)

      expect(dataSigned.getContent()).toBe(`0_${dataToSign}_${Buffer.from(id).toString('base64')}`)
    })
  })
})
