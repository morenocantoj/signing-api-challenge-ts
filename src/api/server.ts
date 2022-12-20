import express, { Router } from 'express'
import bodyParser from 'body-parser'
import { devices } from './v1/devices/devices'
import { errorHandler } from './middlewares/errorHandler'

const server = express()
const router = Router()

server.use(bodyParser.json())

router.get('/health', (_req, res, _next) => {
  res.status(200)
  res.send(
    JSON.stringify({
      status: 'pass',
      version: 'v1',
    })
  )
})

router.use('/devices', devices)

server.use('/v1', router)

server.use(errorHandler)

export default server
