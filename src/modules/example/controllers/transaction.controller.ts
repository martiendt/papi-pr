import { objClean } from '@point-hub/express-utils'

import { IController, IControllerInput } from '@/interfaces/controller.interface'
import { schemaValidation } from '@/validation'

import { CreateRepository } from '../repositories/create.repository'
import { CreateExampleUseCase } from '../use-cases/create.use-case'

export const transactionExampleController: IController = async (controllerInput: IControllerInput) => {
  let session
  try {
    session = controllerInput.dbConnection.startSession()
    session.startTransaction()

    const createRepository = new CreateRepository(controllerInput.dbConnection)

    // create data 1
    const response = await new CreateExampleUseCase(createRepository).handle(
      controllerInput.httpRequest.body.data1,
      { cleanObject: objClean, schemaValidation },
      { session },
    )

    // create data 2
    await new CreateExampleUseCase(createRepository).handle(
      controllerInput.httpRequest.body.data2,
      { cleanObject: objClean, schemaValidation },
      { session },
    )

    await session.commitTransaction()

    return {
      status: 201,
      json: {
        insertedId: response.insertedId,
      },
    }
  } catch (error) {
    await session?.abortTransaction()
    throw error
  } finally {
    await session?.endSession()
  }
}
