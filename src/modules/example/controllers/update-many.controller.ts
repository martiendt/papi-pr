import { IController, IControllerInput } from '@/interfaces/controller.interface'
import { UpdateManyRepository } from '../repositories/update-many.repository'
import { UpdateManyExampleUseCase } from '../use-cases/update-many.use-case'
import { objClean } from '@point-hub/express-utils'
import { schemaValidation } from '@/validation'

export const updateManyExampleController: IController = async (controllerInput: IControllerInput) => {
  const repository = new UpdateManyRepository(controllerInput.dbConnection)

  const response = await new UpdateManyExampleUseCase(repository).handle({
    deps: {
      cleanObject: objClean,
      schemaValidation,
    },
    filter: controllerInput.httpRequest.body.filter,
    data: controllerInput.httpRequest.body.data,
  })

  return {
    status: 200,
    json: {
      matchedCount: response.matchedCount,
      modifiedCount: response.modifiedCount,
    },
  }
}
