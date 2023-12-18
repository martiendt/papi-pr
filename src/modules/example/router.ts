import { Router } from 'express'
import { makeController } from '../../express'
import * as controller from './controller/index'

const router = Router()

router.get('/', await makeController(controller.retrieveAllExampleController))
router.get('/:id', await makeController(controller.retrieveExampleController))
router.post('/', await makeController(controller.createExampleController))

export default router
