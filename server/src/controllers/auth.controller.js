import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import { expressjwt } from 'express-jwt'
import config from './../../config.js'
import bcrypt from 'bcrypt'

const signin = async (req, res) => {
    try {
        let user = await User.findOne({
            email: req.body.email,
        })

        if (!user)
            return res.status('401').json({
                error: 'User not found',
            })

        if (!user.authenticate(req.body.password)) {
            return res.status('401').send({
                error: "Email and password don't match.",
            })
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            config.jwtSecret,
        )
        const userCredentials = {
            id: user._id,
            token: token,
        }
        res.cookie('t', userCredentials, {
            maxAge: 900000,
            httpOnly: true,
            secure: false,
        })

        return res.json({
            user: { _id: user._id, name: user.name, email: user.email },
        })
    } catch (err) {
        console.log(err)
        return res.status('401').json({
            error: 'Could not sign in',
        })
    }
}

const signout = (req, res) => {
    res.clearCookie('t')
    return res.status('200').json({
        message: 'signed out',
    })
}

const requireSignin = expressjwt({
    secret: config.jwtSecret,
    userProperty: 'auth',
    algorithms: ['HS256'],
}) // Method has been removed from routes, since token is held as an httpOnly cookie

const hasAuthorization = (req, res, next) => {
    const authorized =
        req.profile && req.auth && req.profile._id == req.auth._id
    if (!authorized) {
        return res.status('403').json({
            error: 'User is not authorized',
        })
    }
    next()
}

const authorization = async (req, res, next) => {
    const token = req.cookies.t.token
    if (!token) {
        return res.status(402).json({
            error: 'No authorization token',
        })
    }
    try {
        if (jwt.verify(token, config.jwtSecret)) {
            next()
        }
    } catch (err) {
        return res.status(400).json({
            error: 'User has not authorization',
        })
    }
}

export default {
    signin,
    signout,
    requireSignin,
    hasAuthorization,
    authorization,
}
