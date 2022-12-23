import { Signature } from './Signature'
import { createSignature } from '../../test/factories/createSignature'
describe('Signature', () => {
  let signature: Signature

  describe('isOlderThan', () => {
    it("returns true when signature's timestamp is older than other's", () => {
      const olderDate = new Date('2022-03-25')
      const newerDate = new Date('2022-03-26')
      signature = createSignature({ performedDate: olderDate })
      const newerSignature = createSignature({ performedDate: newerDate })

      const result = signature.isOlderThan(newerSignature)

      expect(result).toBe(true)
    })

    it("returns false when signature's timestamp is newer than other's", () => {
      const olderDate = new Date('2022-03-25')
      const newerDate = new Date('2022-03-26')
      signature = createSignature({ performedDate: newerDate })
      const newerSignature = createSignature({ performedDate: olderDate })

      const result = signature.isOlderThan(newerSignature)

      expect(result).toBe(false)
    })
  })

  describe('serialize', () => {
    it('returns serialized data', () => {
      const id = 'an-id'
      const content = 'some-content'
      const performedDate = new Date()
      signature = createSignature({ id, content, performedDate })

      const result = signature.serialize()

      expect(result.id).toBe(id)
      expect(result.content).toBe(content)
      expect(result.performedDate).toBe(performedDate)
    })
  })
})
