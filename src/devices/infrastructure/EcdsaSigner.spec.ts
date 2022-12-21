import { SignatureAlgorithm } from '../domain/SignatureAlgorithm'
import { EcdsaSigner } from './EcdsaSigner'

describe('EcdsaSigner', () => {
  let signer: EcdsaSigner

  describe('getSignatureAlgorithm', () => {
    it('returns RSA', () => {
      signer = new EcdsaSigner('privateKey', 'publicKey')

      expect(signer.getSignatureAlgorithm()).toBe(SignatureAlgorithm.RSA)
    })
  })

  describe('signData', () => {
    it('returns data codified', () => {
      const stringToCodify = 'something'
      signer = new EcdsaSigner('privateKey', 'publicKey')

      const stringCodified = signer.signData(stringToCodify)

      expect(stringToCodify).not.toEqual(stringCodified)
    })
  })
})
