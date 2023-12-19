import { dbConnection } from '../../../database/database'
import { IController, IHttpRequest } from '../../../interfaces/controller.interface'
import { UpdateRepository } from '../repositories/update.repository'
import { UpdateExampleUseCase } from '../use-cases/update.use-case'

export const updateExampleController: IController = async (httpRequest: IHttpRequest) => {
  console.log(httpRequest)
  const repository = new UpdateRepository(dbConnection)

  const response = await new UpdateExampleUseCase(repository).handle({
    _id: httpRequest.params.id,
    document: httpRequest.body,
  })

  return {
    status: 200,
    json: {
      matchedCount: response.matchedCount,
      modifiedCount: response.modifiedCount,
    },
  }
}
