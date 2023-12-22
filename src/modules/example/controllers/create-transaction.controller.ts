import { objClean } from '@point-hub/express-utils'

import { IController, IControllerInput } from '@/interfaces/controller.interface'
import { schemaValidation } from '@/validation'

import { CreateRepository } from '../repositories/create.repository'
import { CreateExampleUseCase } from '../use-cases/create.use-case'

export const createTransactionExampleController: IController = async (controllerInput: IControllerInput) => {
  try {
    const session = controllerInput.dbConnection.startSession()

    session.startTransaction()

    const repository = new CreateRepository(controllerInput.dbConnection)

    const response = await new CreateExampleUseCase(repository).handle({
      deps: { cleanObject: objClean, schemaValidation },
      data: controllerInput.httpRequest.body,
    })

    await controllerInput.dbConnection.commitTransaction()
    return {
      status: 201,
      json: {
        insertedId: response.insertedId,
      },
    }
  } catch (error) {
    console.log('catch')
    await controllerInput.dbConnection.abortTransaction()
    throw error
  } finally {
    console.log('finally')
    await controllerInput.dbConnection.endSession()
  }
}
