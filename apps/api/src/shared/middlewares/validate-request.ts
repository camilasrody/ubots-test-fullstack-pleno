import { type NextFunction, type Request, type Response } from 'express'
import { type ZodSchema } from 'zod'

type ValidationSchemas = {
  body?: ZodSchema
  params?: ZodSchema
  query?: ZodSchema
}

export const validateRequest = (schemas: ValidationSchemas) => {
  return (request: Request, _response: Response, next: NextFunction) => {
    if (schemas.body) {
      request.body = schemas.body.parse(request.body)
    }

    if (schemas.params) {
      request.params = schemas.params.parse(request.params) as Request['params']
    }

    if (schemas.query) {
      request.query = schemas.query.parse(request.query) as Request['query']
    }

    next()
  }
}
