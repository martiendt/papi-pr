import { dbConnection } from '../../../database/database'
import { IController, IHttpRequest } from '../../../interfaces/controller.interface'
import { CreateManyRepository } from '../repositories/create-many.repository'
import { CreateManyExampleUseCase } from '../use-cases/create-many.use-case'

export const createManyExampleController: IController = async (httpRequest: IHttpRequest) => {
  const repository = new CreateManyRepository(dbConnection)

  await new CreateManyExampleUseCase(repository).handle(httpRequest.body)

  return {
    status: 204,
  }
}
