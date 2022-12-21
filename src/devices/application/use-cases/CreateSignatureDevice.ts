import { Device } from '../../domain/Device'
import { DeviceCreateDTO } from '../../../api/v1/devices/dtos/DeviceCreateDTO'
import { DeviceRepository } from '../../domain/DeviceRepository'
import { SignatureAlgorithm } from '../../domain/SignatureAlgorithm'
import { RsaSigner } from '../../infrastructure/RsaSigner'
import { Signer } from '../../domain/Signer'
import { SignatureMethodNotFoundError } from '../../domain/errors/SignatureMethodNotFoundError'

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
        throw new Error('Not implemented yet')

      default:
        throw new SignatureMethodNotFoundError(signatureAlgorithm)
    }
  }
}
