import { IController, IControllerInput } from '@/interfaces/controller.interface'
import { UpdateRepository } from '../repositories/update.repository'
import { UpdateExampleUseCase } from '../use-cases/update.use-case'
import { objClean } from '@point-hub/express-utils'
import { schemaValidation } from '@/validation'

export const updateExampleController: IController = async (controllerInput: IControllerInput) => {
  const repository = new UpdateRepository(controllerInput.dbConnection)

  const response = await new UpdateExampleUseCase(repository).handle({
    deps: {
      cleanObject: objClean,
      schemaValidation,
    },
    _id: controllerInput.httpRequest.params.id,
    data: controllerInput.httpRequest.body,
  })

  return {
    status: 200,
    json: {
      matchedCount: response.matchedCount,
      modifiedCount: response.modifiedCount,
    },
  }
}
