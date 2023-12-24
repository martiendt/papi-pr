import { BaseServer } from '@point-hub/papi'
import { Express } from 'express'

import { IServerConfig } from './config/server'

/**
 * Create server and listen for connections.
 */
export const createServer = async (app: Express, serverConfig: IServerConfig) => {
  try {
    await new BaseServer(app).listen(serverConfig.port, serverConfig.host)
    console.info(`Pointhub API Listening on http://${serverConfig.host || 'localhost'}:${serverConfig.port}`)
  } catch (error) {
    console.error(error)
  }
}
