import { errorHandlerMiddleware, invalidPathMiddleware } from '@point-hub/express-error-handler'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'

import { IDatabase } from './interfaces/database.interface'
import router from './router'

export interface IAppInput {
  dbConnection: IDatabase
}

export const createApp = async (appInput: IAppInput) => {
  const app = express()

  /**
   * Get Client IP
   *
   * 1. Edit nginx header like this "proxy_set_header X-Forwarded-For $remote_addr;"
   * 2. Enable trust proxy on express app "app.set('trust proxy', true)"
   * 3. Use "req.ip" to get Client IP
   *
   * Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
   * see https://expressjs.com/en/guide/behind-proxies.html
   */
  app.set('trust proxy', true)
  // Gzip compressing can greatly decrease the size of the response body
  app.use(compression())
  // Parse json request body
  app.use(express.json())
  // Parse urlencoded request body
  app.use(express.urlencoded({ extended: false }))
  // Set security HTTP headers
  app.use(helmet())
  // Parse cookie
  app.use(cookieParser('secret'))
  // Cors
  app.use(
    cors({
      // origin: 'http://localhost:5173',
      // credentials: true,
    }),
  )

  /**
   * Static Assets
   *
   * All files must be placed in the src/assets folder, to be publicly accessible in the /assets path.
   */
  app.use('/assets', express.static('src/assets'))

  /**
   * API Routes
   *
   * Here is where you can register API routes for your application.
   */
  app.use('/', await router(appInput))

  app.use(invalidPathMiddleware)

  app.use(errorHandlerMiddleware)

  return app
}
