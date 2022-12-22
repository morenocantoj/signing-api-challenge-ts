import { SignatureAlgorithm } from './SignatureAlgorithm'

export interface Signer {
  getSignatureAlgorithm(): SignatureAlgorithm
  sign(data: string): string
}
