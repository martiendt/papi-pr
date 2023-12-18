import { dbConnection } from '../../../database/database'
import { IController, IHttpRequest } from '../../../interfaces/controller.interface'
import { RetrieveRepository } from '../repositories/retrieve.repository'
import { RetrieveExampleUseCase } from '../use-cases/retrieve.use-case'

export const retrieveExampleController: IController = async (httpRequest: IHttpRequest) => {
  const repository = new RetrieveRepository(dbConnection)

  const response = await new RetrieveExampleUseCase(repository).handle(httpRequest.body)

  return {
    status: 200,
    json: {
      data: response,
    },
  }
}
