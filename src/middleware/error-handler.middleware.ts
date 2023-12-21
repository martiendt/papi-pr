import { NextFunction, Request, Response } from 'express'
import { MongoServerError } from 'mongodb'

import MongoErrorHandler from '@/database/mongodb/mongodb-error-handler'

export default function errorHandler() {
  return (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof MongoServerError) {
      throw new MongoErrorHandler(err)
    }
    next(err)
  }
}
