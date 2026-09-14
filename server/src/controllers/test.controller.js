import dotenv from 'dotenv'
dotenv.config()
import User from './../models/user.model.js'
import Post from './../models/post.model.js'
import errorHandler from './../helpers/dbErrorHandler.js'

const globalSetup = async (req, res) => {
    try {
        if (process.env.ENVIRONMENT == 'sandbox') {
            process.env.ENVIRONMENT = 'test'
        }
        await User.deleteMany({})
        await Post.deleteMany({})
        return await res.status(201).json({
            message: 'Setup successful',
        })
    } catch (err) {
        return await res.status(500).json({
            error: errorHandler.getErrorMessage(err),
        })
    }
}
const globalTearDown = async (req, res) => {
    try {
        if ((process.env.ENVIRONMENT = 'test')) {
            process.env.ENVIRONMENT = 'sandbox'
        }
        return res.status(200).json({
            message: 'Teardown successful',
        })
    } catch (err) {
        return res.status(500).json({
            error: errorHandler.getErrorMessage(err),
        })
    }
}
export default {
    globalSetup,
    globalTearDown,
}
