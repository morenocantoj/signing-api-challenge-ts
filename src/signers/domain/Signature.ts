import { generateId } from '../../shared/domain/generateId'

export class Signature {
  constructor(private id: string, private content: string, private performedDate: Date) {}

  static create(content: string): Signature {
    return new Signature(generateId(), content, new Date())
  }

  getPerformedDate(): Date {
    return this.performedDate
  }

  getContent(): string {
    return this.content
  }

  serialize() {
    return { id: this.id, content: this.content, performedDate: this.performedDate }
  }

  isOlderThan(signature: Signature): boolean {
    return this.getPerformedDate().getTime() < signature.getPerformedDate().getTime()
  }
}
