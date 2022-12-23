import { Device } from '../../devices/domain/Device'
import { generateId } from '../../shared/domain/generateId'
import { SignatureAlgorithm } from '../../signers/domain/SignatureAlgorithm'
import { Signer } from '../../signers/domain/Signer'
import { SignerFake } from '../../signers/domain/SignerFake'
import { Signature } from '../../signers/domain/Signature'

export function createDevice({
  id = generateId(),
  label = 'a-label',
  signer = new SignerFake(SignatureAlgorithm.RSA) as Signer,
  signaturesHistory = [] as Signature[],
} = {}): Device {
  return new Device({
    id,
    label,
    signer,
    signaturesHistory,
  })
}
