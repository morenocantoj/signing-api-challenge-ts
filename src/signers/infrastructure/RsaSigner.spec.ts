import { SignatureAlgorithm } from '../../signers/domain/SignatureAlgorithm'
import { RsaSigner } from './RsaSigner'

describe('RsaSigner', () => {
  let signer: RsaSigner

  describe('getSignatureAlgorithm', () => {
    it('returns RSA', () => {
      signer = new RsaSigner('privateKey', 'publicKey')

      expect(signer.getSignatureAlgorithm()).toBe(SignatureAlgorithm.RSA)
    })
  })

  describe('sign', () => {
    it('returns data codified', () => {
      const stringToCodify = 'something'
      signer = new RsaSigner('privateKey', 'publicKey')

      const stringCodified = signer.sign(stringToCodify).serialize().content

      expect(stringToCodify).not.toEqual(stringCodified)
    })
  })
})
