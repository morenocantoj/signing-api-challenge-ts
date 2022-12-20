import express from 'express'
import bodyParser from 'body-parser'
import { devices } from './devices/devices'
import { errorHandler } from './middlewares/errorHandler'

const server = express()

server.use(bodyParser.json())

server.get('/health', (req, res, next) => {
  res.status(200)
  res.send(
    JSON.stringify({
      status: 'pass',
      version: 'v1',
    })
  )
})

server.use('/devices', devices)

server.use(errorHandler)

export default server
