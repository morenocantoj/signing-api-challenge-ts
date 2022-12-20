import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import { devices } from './devices/devices'
import { DomainError, ErrorCategory } from '../shared/domain/errors/DomainError'
import { config } from '../config'

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

const errorCategoryToHttpCode: Record<ErrorCategory, number> = {
  [ErrorCategory.BAD_REQUEST]: 400,
  [ErrorCategory.UNKNOWN]: 500,
}

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof DomainError) {
    res.status(errorCategoryToHttpCode[err.category])
    res.send({
      category: err.category,
      message: err.message,
      stack: config.node.env === 'development' ? err.stack : undefined,
    })
  }

  res.status(500)
  res.send({
    category: ErrorCategory.UNKNOWN,
    message: config.node.env === 'development' ? err.message : 'Something went wrong',
    stack: config.node.env === 'development' ? err.stack : undefined,
  })
}

server.use(errorHandler)

export default server
