export class SignatureResponseDTO {
  signature!: string

  static serialize(dataSigned: string): SignatureResponseDTO {
    return {
      signature: dataSigned,
    }
  }
}
