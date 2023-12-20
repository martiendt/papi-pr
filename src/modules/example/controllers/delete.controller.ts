import { dbConnection } from '@/database/database'
import { IController, IHttpRequest } from '@/interfaces/controller.interface'
import { DeleteRepository } from '../repositories/delete.repository'
import { DeleteExampleUseCase } from '../use-cases/delete.use-case'

export const deleteExampleController: IController = async (httpRequest: IHttpRequest) => {
  const repository = new DeleteRepository(dbConnection)

  const response = await new DeleteExampleUseCase(repository).handle({
    _id: httpRequest.params.id,
  })

  return {
    status: 200,
    json: { deletedCount: response.deletedCount },
  }
}
