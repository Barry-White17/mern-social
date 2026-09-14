import express from 'express'
import userCtrl from '../controllers/user.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

router.route('/api/users').post(userCtrl.create)

router.route('/api/users/photo/:userId').get(userCtrl.photo)

router
    .route('/api/users/follow')
    .put(authCtrl.authorization, userCtrl.addFollowing, userCtrl.addFollower)
router
    .route('/api/users/unfollow')
    .put(
        authCtrl.authorization,
        userCtrl.removeFollowing,
        userCtrl.removeFollower,
    )

router
    .route('/api/users/findpeople/:userId')
    .get(authCtrl.authorization, userCtrl.findPeople)

router
    .route('/api/users/:userId')
    .get(authCtrl.authorization, userCtrl.read)
    .put(authCtrl.authorization, authCtrl.hasAuthorization, userCtrl.update)
    .delete(authCtrl.authorization, authCtrl.hasAuthorization, userCtrl.remove)

router.param('userId', userCtrl.userByID)

export default router
