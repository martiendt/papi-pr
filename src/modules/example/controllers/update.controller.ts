import { dbConnection } from '@/database/database'
import { IController, IHttpRequest } from '@/interfaces/controller.interface'
import { UpdateRepository } from '../repositories/update.repository'
import { UpdateExampleUseCase } from '../use-cases/update.use-case'
import { objClean } from '@point-hub/express-utils'

export const updateExampleController: IController = async (httpRequest: IHttpRequest) => {
  const repository = new UpdateRepository(dbConnection)

  const response = await new UpdateExampleUseCase(repository).handle({
    deps: {
      cleanObject: objClean,
    },
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
