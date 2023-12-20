import { IController, IControllerInput } from '@/interfaces/controller.interface'
import { DeleteManyRepository } from '../repositories/delete-many.repository'
import { DeleteManyExampleUseCase } from '../use-cases/delete-many.use-case'
import { schemaValidation } from '@/validation'

export const deleteManyExampleController: IController = async (controllerInput: IControllerInput) => {
  const repository = new DeleteManyRepository(controllerInput.dbConnection)

  const response = await new DeleteManyExampleUseCase(repository).handle({
    deps: {
      schemaValidation,
    },
    data: {
      ids: controllerInput.httpRequest.body.ids,
    },
  })

  return {
    status: 200,
    json: { deletedCount: response.deletedCount },
  }
}
