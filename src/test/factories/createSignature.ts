import { Signature } from '../../signers/domain/Signature'

export function createSignature({
  id = 'an-id',
  content = 'signature-content',
  performedDate = new Date('1990-01-01'),
} = {}): Signature {
  return new Signature(id, content, performedDate)
}
