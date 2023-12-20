import { Router } from 'express'
import { makeController } from '@/express'
import * as controller from './controllers/index'

const router = Router()

router.post('/', await makeController(controller.createExampleController))
router.get('/', await makeController(controller.retrieveAllExampleController))
router.get('/:id', await makeController(controller.retrieveExampleController))
router.patch('/:id', await makeController(controller.updateExampleController))
router.delete('/:id', await makeController(controller.deleteExampleController))
router.post('/create-many', await makeController(controller.createManyExampleController))
router.post('/update-many', await makeController(controller.updateManyExampleController))
router.post('/delete-many', await makeController(controller.deleteManyExampleController))

export default router
