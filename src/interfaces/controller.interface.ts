/* eslint-disable @typescript-eslint/no-explicit-any */

import { IDatabase } from './database.interface'

export interface IHttpRequest {
  [key: string]: any
}

export interface IControllerInput {
  httpRequest: IHttpRequest
  dbConnection: IDatabase
}

export interface IController {
  (input: IControllerInput): Promise<IControllerOutput>
}

export interface IControllerOutput {
  status: number
  json?: any
}
