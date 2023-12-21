import { objClean } from '@point-hub/express-utils'

import { IController, IControllerInput } from '@/interfaces/controller.interface'
import { schemaValidation } from '@/validation'

import { UpdateRepository } from '../repositories/update.repository'
import { UpdateExampleUseCase } from '../use-cases/update.use-case'

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
