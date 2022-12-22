import { generateRsaKeyPair } from './crypto/generation'
import sign from './crypto/rsa'
import { SignatureAlgorithm } from '../../signers/domain/SignatureAlgorithm'
import { Signer } from '../../signers/domain/Signer'

export class RsaSigner extends Signer {
  private privateKey: string
  private publicKey: string

  constructor(privateKey: string, publicKey: string) {
    super(SignatureAlgorithm.RSA)

    this.privateKey = privateKey
    this.publicKey = publicKey
  }

  sign(data: string) {
    return sign(data, { private: this.privateKey, public: this.publicKey })
  }

  static async generateKeyPair() {
    return generateRsaKeyPair()
  }

  static async create(): Promise<RsaSigner> {
    const keyPair = await RsaSigner.generateKeyPair()

    return new RsaSigner(keyPair.private, keyPair.public)
  }
}
