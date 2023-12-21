import express, { Express } from 'express'

import { IDatabase } from './interfaces/database.interface'
import exampleRouter from './modules/example/router'

export interface IBaseRouterInput {
  dbConnection: IDatabase
}

export default async function (baseRouterInput: IBaseRouterInput) {
  const app: Express = express()

  /**
   * Register all available modules
   * <modules>/router.ts
   */
  app.use('/v1/examples', await exampleRouter(baseRouterInput))

  return app
}
