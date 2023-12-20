import { IController, IControllerInput } from '@/interfaces/controller.interface'
import { RetrieveRepository } from '../repositories/retrieve.repository'
import { RetrieveExampleUseCase } from '../use-cases/retrieve.use-case'

export const retrieveExampleController: IController = async (controllerInput: IControllerInput) => {
  const repository = new RetrieveRepository(controllerInput.dbConnection)

  const response = await new RetrieveExampleUseCase(repository).handle({
    _id: controllerInput.httpRequest.params.id,
  })

  return {
    status: 200,
    json: response,
  }
}
