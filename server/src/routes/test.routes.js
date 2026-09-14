import express from 'express'
import testController from './../controllers/test.controller.js'

const router = express.Router()

router.route('/api/tests/globalSetup').get(testController.globalSetup)
router.route('/api/tests/globalTearDown').get(testController.globalTearDown)

export default router
