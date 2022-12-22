import { SignatureAlgorithm } from './SignatureAlgorithm'

export abstract class Signer {
  protected signatureAlgorithm: SignatureAlgorithm

  constructor(signatureAlgorithm: SignatureAlgorithm) {
    this.signatureAlgorithm = signatureAlgorithm
  }

  getSignatureAlgorithm(): SignatureAlgorithm {
    return this.signatureAlgorithm
  }

  abstract sign(data: string): string
}
