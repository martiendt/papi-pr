import { Express } from 'express'

export interface IServerConfig {
  port: number
  host: string
}

/**
 * Create server and listen for connections.
 */
export const createServer = (app: Express, serverConfig: IServerConfig) => {
  app.listen(serverConfig.port, serverConfig.host, () => {
    console.info(`Listening on http://${serverConfig.host || 'localhost'}:${serverConfig.port}`)
  })
}
