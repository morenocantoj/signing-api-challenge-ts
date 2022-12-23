import { SignatureAlgorithm } from './SignatureAlgorithm'
import { Signature } from './Signature'

export interface Signer {
  getSignatureAlgorithm(): SignatureAlgorithm
  sign(data: string): Signature
}
