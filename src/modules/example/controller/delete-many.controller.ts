import { dbConnection } from '../../../database/database'
import { IController, IHttpRequest } from '../../../interfaces/controller.interface'
import { DeleteManyRepository } from '../repositories/delete-many.repository'
import { DeleteManyExampleUseCase } from '../use-cases/delete-many.use-case'

export const deleteManyExampleController: IController = async (httpRequest: IHttpRequest) => {
  const repository = new DeleteManyRepository(dbConnection)

  const response = await new DeleteManyExampleUseCase(repository).handle(httpRequest.body)

  return {
    status: 200,
    json: { deletedCount: response.deletedCount },
  }
}
