/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IHttpRequest {
  [key: string]: any
}

export interface IController {
  (httpRequest: IHttpRequest): Promise<IControllerOutput>
}

export interface IControllerOutput {
  status: number
  json?: any
}
