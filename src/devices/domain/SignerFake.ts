import { SignatureAlgorithm } from './SignatureAlgorithm'
import { Signer } from './Signer'

export class SignerFake extends Signer {
  constructor(signatureAlgorithm = SignatureAlgorithm.RSA) {
    super(signatureAlgorithm)
  }

  signData(data: string) {
    return data
  }
}