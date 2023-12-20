import { IController, IControllerInput } from '@/interfaces/controller.interface'
import { CreateManyRepository } from '../repositories/create-many.repository'
import { CreateManyExampleUseCase } from '../use-cases/create-many.use-case'
import { objClean } from '@point-hub/express-utils'
import { schemaValidation } from '@/validation'

export const createManyExampleController: IController = async (controllerInput: IControllerInput) => {
  const repository = new CreateManyRepository(controllerInput.dbConnection)

  const response = await new CreateManyExampleUseCase(repository).handle({
    deps: { cleanObject: objClean, schemaValidation },
    data: controllerInput.httpRequest.body,
  })

  return {
    status: 201,
    json: {
      insertedIds: response.insertedIds,
      insertedCount: response.insertedCount,
    },
  }
}
