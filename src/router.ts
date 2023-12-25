import type { IBaseRouterInput } from '@point-hub/papi'
import express, { Express } from 'express'

import exampleRouter from './modules/example/router'

export default async function (baseRouterInput: IBaseRouterInput) {
  const app: Express = express()

  /**
   * Register all available modules
   * <modules>/router.ts
   */
  app.use('/v1/examples', await exampleRouter(baseRouterInput))

  return app
}
