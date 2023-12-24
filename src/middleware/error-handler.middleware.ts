import { BaseMongoErrorHandler, BaseMongoServerError } from '@point-hub/papi'
import { NextFunction, Request, Response } from 'express'

export default function errorHandler() {
  return (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof BaseMongoServerError) {
      throw new BaseMongoErrorHandler(err)
    }
    next(err)
  }
}
