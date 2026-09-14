import express from 'express'
import userCtrl from '../controllers/user.controller.js'
import authCtrl from '../controllers/auth.controller.js'
import postCtrl from '../controllers/post.controller.js'

const router = express.Router()

router
    .route('/api/posts/new/:userId')
    .post(authCtrl.authorization, postCtrl.create)

router.route('/api/posts/photo/:postId').get(postCtrl.photo)

router
    .route('/api/posts/by/:userId')
    .get(authCtrl.authorization, postCtrl.listByUser)

router
    .route('/api/posts/feed/:userId')
    .get(authCtrl.authorization, postCtrl.listNewsFeed)

router.route('/api/posts/like').put(authCtrl.authorization, postCtrl.like)
router.route('/api/posts/unlike').put(authCtrl.authorization, postCtrl.unlike)

router.route('/api/posts/comment').put(authCtrl.authorization, postCtrl.comment)
router
    .route('/api/posts/uncomment')
    .put(authCtrl.authorization, postCtrl.uncomment)

router
    .route('/api/posts/:postId')
    .delete(authCtrl.authorization, postCtrl.isPoster, postCtrl.remove)

router.param('userId', userCtrl.userByID)
router.param('postId', postCtrl.postByID)

export default router
