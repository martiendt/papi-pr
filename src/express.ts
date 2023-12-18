import { Request, Response, NextFunction } from 'express'
import { IController, IHttpRequest } from './interfaces/controller.interface'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const makeController = async (controller: IController) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: IHttpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        Accept: req.get('Accept'),
        Authorization: req.get('Authorization'),
        'Content-Type': req.get('Content-Type'),
        'User-Agent': req.get('User-Agent'),
      },
    }

    try {
      const response = await controller(httpRequest)
      res.status(response.status)
      if (response.json) {
        res.json(response.json)
      }
    } catch (error) {
      next(error)
    }
  }
}
