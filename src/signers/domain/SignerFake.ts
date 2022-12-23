import { SignatureAlgorithm } from './SignatureAlgorithm'
import { Signer } from './Signer'
import { Signature } from './Signature'

export class SignerFake implements Signer {
  constructor(public readonly signatureAlgorithm = SignatureAlgorithm.RSA) {}

  getSignatureAlgorithm(): SignatureAlgorithm {
    return this.signatureAlgorithm
  }

  sign(data: string) {
    return Signature.create(data)
  }
}
