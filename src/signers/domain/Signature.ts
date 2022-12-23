import { generateId } from '../../shared/domain/generateId'

export class Signature {
  constructor(private id: string, private content: string, private performedDate: Date) {}

  static create(content: string): Signature {
    return new Signature(generateId(), content, new Date())
  }

  getId(): string {
    return this.id
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

  isNewerThan(signature: Signature): boolean {
    return this.getPerformedDate().getTime() < signature.getPerformedDate().getTime()
  }
}
