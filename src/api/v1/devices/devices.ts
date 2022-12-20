import { Router } from 'express'
import { DeviceCreateDTO } from './dtos/DeviceCreateDTO'
import { CreateSignatureDevice } from '../../../devices/application/use-cases/CreateSignatureDevice'
import { devicesRepository } from '../../../devices/infrastructure/dependencies'
import { DeviceResponseDTO } from './dtos/DeviceResponseDTO'

export const devices = Router()

const createSignatureDevice = new CreateSignatureDevice(devicesRepository)

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
