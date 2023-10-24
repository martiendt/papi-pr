import { createApp } from './app.ts'
import { createServer } from './server.ts'

const app = createApp()

createServer(app)
