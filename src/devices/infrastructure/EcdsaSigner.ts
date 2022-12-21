import sign from '../../crypto/ecdsa'
import { generateEcKeyPair } from '../../crypto/generation'
import { SignatureAlgorithm } from '../domain/SignatureAlgorithm'
import { Signer } from '../domain/Signer'

export class EcdsaSigner extends Signer {
  private privateKey: string
  private publicKey: string

  constructor(privateKey: string, publicKey: string) {
    super(SignatureAlgorithm.ECC)

    this.privateKey = privateKey
    this.publicKey = publicKey
  }

  signData(data: string) {
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