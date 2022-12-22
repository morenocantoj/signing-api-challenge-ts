import sign from './crypto/ecdsa'
import { generateEcKeyPair } from './crypto/generation'
import { SignatureAlgorithm } from '../../signers/domain/SignatureAlgorithm'
import { Signer } from '../../signers/domain/Signer'

export class EcdsaSigner implements Signer {
  private privateKey: string
  private publicKey: string

  constructor(privateKey: string, publicKey: string) {
    this.privateKey = privateKey
    this.publicKey = publicKey
  }

  getSignatureAlgorithm(): SignatureAlgorithm {
    return SignatureAlgorithm.ECC
  }

  sign(data: string) {
    return sign(data, { private: this.privateKey, public: this.publicKey })
  }

  static async generateKeyPair() {
    return generateEcKeyPair()
  }

  static async create(): Promise<EcdsaSigner> {
    const keyPair = await EcdsaSigner.generateKeyPair()

    return new EcdsaSigner(keyPair.private, keyPair.public)
  }
}
