import { IController, IControllerInput } from '@/interfaces/controller.interface'

import { RetrieveAllRepository } from '../repositories/retrieve-all.repository'
import { RetrieveAllExampleUseCase } from '../use-cases/retrieve-all.use-case'

export const retrieveAllExampleController: IController = async (controllerInput: IControllerInput) => {
  const repository = new RetrieveAllRepository(controllerInput.dbConnection)

  const response = await new RetrieveAllExampleUseCase(repository).handle({
    query: controllerInput.httpRequest.query,
  })

  return {
    status: 200,
    json: {
      data: response.data,
      pagination: response.pagination,
    },
  }
}
