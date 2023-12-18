import { createApp } from './app'
import { createServer } from './server'
import serverConfig from './config/server'

const app = createApp()

createServer(app, serverConfig)
