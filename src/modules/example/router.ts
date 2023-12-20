import { Router } from 'express'
import { makeController } from '@/express'
import { IDatabase } from '@/interfaces/database.interface'
import * as controller from './controllers/index'

export interface IRouterInput {
  dbConnection: IDatabase
}

const makeRouter = async (routerInput: IRouterInput) => {
  const router = Router()

  router.post(
    '/',
    await makeController({
      controller: controller.createExampleController,
      dbConnection: routerInput.dbConnection,
    }),
  )
  router.get(
    '/',
    await makeController({
      controller: controller.retrieveAllExampleController,
      dbConnection: routerInput.dbConnection,
    }),
  )
  router.get(
    '/:id',
    await makeController({
      controller: controller.retrieveExampleController,
      dbConnection: routerInput.dbConnection,
    }),
  )
  router.patch(
    '/:id',
    await makeController({
      controller: controller.updateExampleController,
      dbConnection: routerInput.dbConnection,
    }),
  )
  router.delete(
    '/:id',
    await makeController({
      controller: controller.deleteExampleController,
      dbConnection: routerInput.dbConnection,
    }),
  )
  router.post(
    '/create-many',
    await makeController({
      controller: controller.createManyExampleController,
      dbConnection: routerInput.dbConnection,
    }),
  )
  router.post(
    '/update-many',
    await makeController({
      controller: controller.updateManyExampleController,
      dbConnection: routerInput.dbConnection,
    }),
  )
  router.post(
    '/delete-many',
    await makeController({
      controller: controller.deleteManyExampleController,
      dbConnection: routerInput.dbConnection,
    }),
  )

  return router
}

export default makeRouter
