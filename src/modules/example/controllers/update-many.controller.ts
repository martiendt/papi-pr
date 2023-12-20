import { dbConnection } from '@/database/database'
import { IController, IHttpRequest } from '@/interfaces/controller.interface'
import { UpdateManyRepository } from '../repositories/update-many.repository'
import { UpdateManyExampleUseCase } from '../use-cases/update-many.use-case'

export const updateManyExampleController: IController = async (httpRequest: IHttpRequest) => {
  const repository = new UpdateManyRepository(dbConnection)

  const response = await new UpdateManyExampleUseCase(repository).handle({
    filter: httpRequest.body.filter,
    document: httpRequest.body.data,
  })

  return {
    status: 200,
    json: {
      matchedCount: response.matchedCount,
      modifiedCount: response.modifiedCount,
    },
  }
}
