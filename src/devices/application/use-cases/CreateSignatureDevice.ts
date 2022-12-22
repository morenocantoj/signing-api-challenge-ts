import { Device } from '../../domain/Device'
import { DeviceCreateDTO } from '../../../api/v1/devices/dtos/DeviceCreateDTO'
import { DeviceRepository } from '../../domain/DeviceRepository'
import { SignatureAlgorithm } from '../../../signers/domain/SignatureAlgorithm'
import { Signer } from '../../../signers/domain/Signer'
import { SignatureMethodNotFoundError } from '../../domain/errors/SignatureMethodNotFoundError'
import { RsaSigner } from '../../../signers/infrastructure/RsaSigner'
import { EcdsaSigner } from '../../../signers/infrastructure/EcdsaSigner'

export class CreateSignatureDevice {
  constructor(private readonly deviceRepository: DeviceRepository) {}

  async execute(deviceCreateDTO: DeviceCreateDTO): Promise<Device> {
    const device = Device.create({
      signer: await this.createSignerFromAlgorithm(deviceCreateDTO.signatureAlgorithm),
      label: deviceCreateDTO.label,
    })

    return this.deviceRepository.save(device)
  }

  private async createSignerFromAlgorithm(signatureAlgorithm: SignatureAlgorithm): Promise<Signer> {
    switch (signatureAlgorithm) {
      case SignatureAlgorithm.RSA:
        return RsaSigner.create()

      case SignatureAlgorithm.ECC:
        return EcdsaSigner.create()

      default:
        throw new SignatureMethodNotFoundError(signatureAlgorithm)
    }
  }
}
