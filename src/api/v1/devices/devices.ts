import { Router } from 'express'
import { DeviceCreateDTO } from './dtos/DeviceCreateDTO'
import { CreateSignatureDevice } from '../../../devices/application/use-cases/CreateSignatureDevice'
import { devicesRepository } from '../../../devices/infrastructure/dependencies'
import { DeviceResponseDTO } from './dtos/DeviceResponseDTO'
import { CreateSignature } from '../../../devices/application/use-cases/CreateSignature'
import { SignatureCreateDTO } from './dtos/SignatureCreateDTO'
import { SignatureResponseDTO } from './dtos/SignatureResponseDTO'

export const devices = Router()

const createSignatureDevice = new CreateSignatureDevice(devicesRepository)
const createSignature = new CreateSignature(devicesRepository)

devices.post('/', async (req, res, next) => {
  try {
    const deviceCreateDTO = new DeviceCreateDTO(req.body.signature_algorithm, req.body.label)

    const deviceCreated = await createSignatureDevice.execute(deviceCreateDTO)

    return res.status(201).send(DeviceResponseDTO.serialize(deviceCreated))
  } catch (error) {
    next(error)
    return
  }
})

devices.post('/:id/sign', async (req, res, next) => {
  try {
    const signatureCreateDTO = new SignatureCreateDTO(req.body.data_to_be_signed)

    const signedData = await createSignature.execute(req.params.id, signatureCreateDTO)

    return res.status(201).send(SignatureResponseDTO.serialize(signedData))
  } catch (error) {
    next(error)
    return
  }
})
