import { Express } from 'express'
import serverConfig from './config/server.ts'

/**
 * Create server and listen for connections.
 */
export const createServer = (app: Express) => {
  app.listen(serverConfig.port, serverConfig.host, () => {
    console.log(`Listening ${serverConfig.host}:${serverConfig.port}...`)
  })
}
