import { IController, IControllerInput } from '@/interfaces/controller.interface'
import { schemaValidation } from '@/validation'

import { DeleteManyRepository } from '../repositories/delete-many.repository'
import { DeleteManyExampleUseCase } from '../use-cases/delete-many.use-case'

export const deleteManyExampleController: IController = async (controllerInput: IControllerInput) => {
  let session
  try {
    // 1. start session for transactional
    session = controllerInput.dbConnection.startSession()
    session.startTransaction()
    // 2. define repository
    const repository = new DeleteManyRepository(controllerInput.dbConnection)
    // 3. handle business rules
    const response = await new DeleteManyExampleUseCase(repository).handle(
      { ids: controllerInput.httpRequest.body.ids },
      { schemaValidation },
      { session },
    )
    await session.commitTransaction()
    // 4. return response to client
    return {
      status: 200,
      json: { deletedCount: response.deletedCount },
    }
  } catch (error) {
    await session?.abortTransaction()
    throw error
  } finally {
    await session?.endSession()
  }
}
