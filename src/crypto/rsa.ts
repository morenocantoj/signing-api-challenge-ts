import { KeyPair } from './generation'
import crypto from 'crypto'
import { config } from '../config'

export default function sign(dataToBeSigned: string, keyPair: KeyPair): string {
  try {
    const cipher = crypto.createCipheriv(
      'aes-192-cbc',
      crypto.scryptSync(keyPair.private, config.crypto.salt, 24),
      crypto.randomBytes(16)
    )
    let encrypted = cipher.update(dataToBeSigned)
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return encrypted.toString('base64')
  } catch (e) {
    console.log(e)
    throw e
  }
}
