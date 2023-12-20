import { dbConnection } from '@/database/database'
import { IController, IHttpRequest } from '@/interfaces/controller.interface'
import { CreateRepository } from '../repositories/create.repository'
import { CreateExampleUseCase } from '../use-cases/create.use-case'

export const createExampleController: IController = async (httpRequest: IHttpRequest) => {
  const repository = new CreateRepository(dbConnection)

  const response = await new CreateExampleUseCase(repository).handle({
    document: httpRequest.body,
  })

  return {
    status: 201,
    json: {
      insertedId: response.insertedId,
    },
  }
}
