import { MongoErrorHandler } from '@point-hub/papi'
import { NextFunction, Request, Response } from 'express'
import { MongoServerError } from 'mongodb'

export default function errorHandler() {
  return (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.info(err.name)
    if (err.name === 'MongoServerError') {
      err = new MongoErrorHandler(err as MongoServerError)
    }
    next(err)
  }
}
