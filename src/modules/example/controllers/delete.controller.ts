import { IController, IControllerInput } from '@/interfaces/controller.interface'
import { DeleteRepository } from '../repositories/delete.repository'
import { DeleteExampleUseCase } from '../use-cases/delete.use-case'
import { schemaValidation } from '@/validation'

export const deleteExampleController: IController = async (controllerInput: IControllerInput) => {
  const repository = new DeleteRepository(controllerInput.dbConnection)

  const response = await new DeleteExampleUseCase(repository).handle({
    deps: {
      schemaValidation,
    },
    data: {
      _id: controllerInput.httpRequest.params.id,
    },
  })

  return {
    status: 200,
    json: { deletedCount: response.deletedCount },
  }
}
