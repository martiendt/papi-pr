import { dbConnection } from '../../../database/database'
import { IController, IHttpRequest } from '../../../interfaces/controller.interface'
import { CreateManyRepository } from '../repositories/create-many.repository'
import { CreateManyExampleUseCase } from '../use-cases/create-many.use-case'

export const createManyExampleController: IController = async (httpRequest: IHttpRequest) => {
  const repository = new CreateManyRepository(dbConnection)

  const response = await new CreateManyExampleUseCase(repository).handle({
    documents: httpRequest.body,
  })

  return {
    status: 201,
    json: {
      insertedIds: response.insertedIds,
      insertedCount: response.insertedCount,
    },
  }
}
