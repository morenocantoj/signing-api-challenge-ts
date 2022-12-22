import { Device } from '../../devices/domain/Device'
import { generateId } from '../../shared/domain/generateId'
import { SignerFake } from '../../devices/domain/SignerFake'
import { SignatureAlgorithm } from '../../devices/domain/SignatureAlgorithm'
import { Signer } from '../../devices/domain/Signer'

export function createDevice({
  id = generateId(),
  label = 'a-label',
  signer = new SignerFake(SignatureAlgorithm.RSA) as Signer,
  signaturesHistory = [] as string[],
} = {}): Device {
  return new Device({
    id,
    label,
    signer,
    signaturesHistory,
  })
}
