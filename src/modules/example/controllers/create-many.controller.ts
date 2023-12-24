import { objClean } from '@point-hub/express-utils'

import { IController, IControllerInput } from '@/interfaces/controller.interface'
import { schemaValidation } from '@/validation'

import { CreateManyRepository } from '../repositories/create-many.repository'
import { CreateManyExampleUseCase } from '../use-cases/create-many.use-case'

export const createManyExampleController: IController = async (controllerInput: IControllerInput) => {
  let session
  try {
    // 1. start session for transactional
    session = controllerInput.dbConnection.startSession()
    session.startTransaction()
    // 2. define repository
    const repository = new CreateManyRepository(controllerInput.dbConnection)
    // 3. handle business rules
    const response = await new CreateManyExampleUseCase(repository).handle(
      controllerInput.httpRequest.body,
      { cleanObject: objClean, schemaValidation },
      { session },
    )
    await session.commitTransaction()
    // 4. return response to client
    return {
      status: 201,
      json: {
        insertedIds: response.insertedIds,
        insertedCount: response.insertedCount,
      },
    }
  } catch (error) {
    await session?.abortTransaction()
    throw error
  } finally {
    await session?.endSession()
  }
}
