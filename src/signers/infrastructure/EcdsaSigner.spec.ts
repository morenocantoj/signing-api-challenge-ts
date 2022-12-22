import { SignatureAlgorithm } from '../domain/SignatureAlgorithm'
import { EcdsaSigner } from './EcdsaSigner'

describe('EcdsaSigner', () => {
  let signer: EcdsaSigner

  describe('getSignatureAlgorithm', () => {
    it('returns ECC', () => {
      signer = new EcdsaSigner('privateKey', 'publicKey')

      expect(signer.getSignatureAlgorithm()).toBe(SignatureAlgorithm.ECC)
    })
  })

  describe('signData', () => {
    it('returns data codified', () => {
      const stringToCodify = 'something'
      signer = new EcdsaSigner('privateKey', 'publicKey')

      const stringCodified = signer.sign(stringToCodify)

      expect(stringToCodify).not.toEqual(stringCodified)
    })
  })
})
