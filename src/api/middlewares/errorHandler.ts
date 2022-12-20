import { NextFunction, Request, Response } from 'express'
import { config } from '../../config'
import { ErrorCategory, DomainError } from '../../shared/domain/errors/DomainError'

const errorCategoryToHttpCode: Record<ErrorCategory, number> = {
  [ErrorCategory.BAD_REQUEST]: 400,
  [ErrorCategory.UNKNOWN]: 500,
}

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
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
