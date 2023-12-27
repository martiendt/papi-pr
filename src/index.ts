import { createApp } from './app'
import serverConfig from './config/server'
import websocketConfig from './config/websocket'
import { dbConnection } from './database/database'
import { createServer } from './server'
import { makeWebSocketServer } from './websocket'

/**
 * Create database connection. It will keep the connection open by default,
 * and use the same connection for all queries. If you need to close the connection,
 * call dbConnection.close() (which is asynchronous and returns a Promise)..
 */
await dbConnection.open()

/**
 * Create websocket connection
 */
const webSocketServer = await makeWebSocketServer(websocketConfig.port)

const app = await createApp({ dbConnection, webSocketServer })

createServer(app, serverConfig)
