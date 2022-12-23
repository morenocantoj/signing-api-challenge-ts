import { Signature } from '../../../../signers/domain/Signature'
export class SignatureResponseDTO {
  signature!: string

  static serialize(signature: Signature): SignatureResponseDTO {
    const signatureSerialized = signature.serialize()

    return {
      signature: signatureSerialized.content,
    }
  }
}
