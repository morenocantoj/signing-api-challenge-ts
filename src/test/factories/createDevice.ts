import { Device } from '../../devices/domain/Device'
import { generateId } from '../../shared/domain/generateId'
import { SignerFake } from '../../devices/domain/SignerFake'
import { SignatureAlgorithm } from '../../devices/domain/SignatureAlgorithm'

export function createDevice({
  id = generateId(),
  label = 'a-label',
  signer = new SignerFake(SignatureAlgorithm.RSA),
  signaturesPerformed = 0,
} = {}): Device {
  return new Device({
    id,
    label,
    signer,
    signaturesPerformed,
  })
}
