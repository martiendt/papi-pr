import { dbConnection } from '@/database/database'
import { IController, IHttpRequest } from '@/interfaces/controller.interface'
import { RetrieveAllRepository } from '../repositories/retrieve-all.repository'
import { RetrieveAllExampleUseCase } from '../use-cases/retrieve-all.use-case'

export const retrieveAllExampleController: IController = async (httpRequest: IHttpRequest) => {
  const repository = new RetrieveAllRepository(dbConnection)

  const response = await new RetrieveAllExampleUseCase(repository).handle({
    query: httpRequest.query,
  })

  return {
    status: 200,
    json: {
      data: response.data,
      pagination: response.pagination,
    },
  }
}
