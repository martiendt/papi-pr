import { objClean } from '@point-hub/express-utils'
import type { IController, IControllerInput } from '@point-hub/papi'

import { schemaValidation } from '@/validation'

import { CreateRepository } from '../repositories/create.repository'
import { CreateManyRepository } from '../repositories/create-many.repository'
import { DeleteRepository } from '../repositories/delete.repository'
import { DeleteManyRepository } from '../repositories/delete-many.repository'
import { UpdateRepository } from '../repositories/update.repository'
import { UpdateManyRepository } from '../repositories/update-many.repository'
import { CreateExampleUseCase } from '../use-cases/create.use-case'
import { CreateManyExampleUseCase } from '../use-cases/create-many.use-case'
import { DeleteExampleUseCase } from '../use-cases/delete.use-case'
import { DeleteManyExampleUseCase } from '../use-cases/delete-many.use-case'
import { UpdateExampleUseCase } from '../use-cases/update.use-case'
import { UpdateManyExampleUseCase } from '../use-cases/update-many.use-case'

export const transactionExampleController: IController = async (controllerInput: IControllerInput) => {
  let session
  try {
    // 1. start session for transactional
    session = controllerInput.dbConnection.startSession()
    session.startTransaction()
    // 2. define repository
    const createRepository = new CreateRepository(controllerInput.dbConnection)
    const createManyRepository = new CreateManyRepository(controllerInput.dbConnection)
    const updateRepository = new UpdateRepository(controllerInput.dbConnection)
    const updateManyRepository = new UpdateManyRepository(controllerInput.dbConnection)
    const deleteRepository = new DeleteRepository(controllerInput.dbConnection)
    const deleteManyRepository = new DeleteManyRepository(controllerInput.dbConnection)
    // 3. handle business rules
    const responseCreate = await new CreateExampleUseCase(createRepository).handle(
      controllerInput.httpRequest.body.new,
      {
        cleanObject: objClean,
        schemaValidation,
      },
      { session },
    )
    // 3.1. create
    await new CreateExampleUseCase(createRepository).handle(
      controllerInput.httpRequest.body.create,
      {
        cleanObject: objClean,
        schemaValidation,
      },
      { session },
    )
    await session.commitTransaction()
    session.startTransaction()
    // 3.2. create many
    const responseCreateMany = await new CreateManyExampleUseCase(createManyRepository).handle(
      controllerInput.httpRequest.body.createMany,
      {
        cleanObject: objClean,
        schemaValidation,
      },
      { session },
    )
    await session.commitTransaction()
    session.startTransaction()
    // 3.3. update
    await new UpdateExampleUseCase(updateRepository).handle(
      {
        _id: responseCreate.insertedId,
        data: {
          name: controllerInput.httpRequest.body.update.name,
        },
      },
      {
        cleanObject: objClean,
        schemaValidation,
      },
      { session },
    )
    await session.commitTransaction()
    session.startTransaction()
    // 3.4. update many
    await new UpdateManyExampleUseCase(updateManyRepository).handle(
      {
        filter: {
          name: controllerInput.httpRequest.body.updateMany.filter.name,
        },
        data: {
          name: controllerInput.httpRequest.body.updateMany.data.name,
        },
      },
      {
        cleanObject: objClean,
        schemaValidation,
      },
      { session },
    )
    await session.commitTransaction()
    session.startTransaction()
    // 3.5. delete
    await new DeleteExampleUseCase(deleteRepository).handle(
      { _id: controllerInput.httpRequest.body.delete === true ? responseCreate.insertedId : '' },
      {
        schemaValidation,
      },
      { session },
    )
    await session.commitTransaction()
    session.startTransaction()
    // 3.6. delete many
    await new DeleteManyExampleUseCase(deleteManyRepository).handle(
      { ids: controllerInput.httpRequest.body.deleteMany === true ? responseCreateMany.insertedIds : [''] },
      {
        schemaValidation,
      },
      { session },
    )
    await session.commitTransaction()
    // 4. return response to client
    return {
      status: 201,
      json: {
        insertedId: responseCreate.insertedId,
      },
    }
  } catch (error) {
    await session?.abortTransaction()
    throw error
  } finally {
    await session?.endSession()
  }
}
