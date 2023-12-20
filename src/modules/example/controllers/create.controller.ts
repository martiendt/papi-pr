import { objClean } from '@point-hub/express-utils'
import { IController, IControllerInput } from '@/interfaces/controller.interface'
import { CreateRepository } from '../repositories/create.repository'
import { CreateExampleUseCase } from '../use-cases/create.use-case'

export const createExampleController: IController = async (controllerInput: IControllerInput) => {
  const repository = new CreateRepository(controllerInput.dbConnection)

  const response = await new CreateExampleUseCase(repository).handle({
    deps: { cleanObject: objClean },
    document: controllerInput.httpRequest.body,
  })

  return {
    status: 201,
    json: {
      insertedId: response.insertedId,
    },
  }
}
