import User from '../models/user.model.js'
import lodash from 'lodash'
import errorHandler from './../helpers/dbErrorHandler.js'
import formidable, { IncomingForm } from 'formidable'
import fs from 'fs'
import { firstValues } from 'formidable/src/helpers/firstValues.js'
import bcrypt from 'bcrypt'

const create = async (req, res) => {
    console.log(`Req body: ${JSON.stringify(req.body)}`)
    const user = new User(req.body)
    console.log(`One`)
    try {
        await user.save()
        console.log(`Two`)
        return res
            .status(200)
            .json({ message: 'Successfully signed up', user: user._id }) // User Object is returned for tests only
        console.log(`Three`)
    } catch (err) {
        console.log(`Three and half`)
        console.log(`Error: ${err}`)
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        })
        console.log(`Four`)
    }
}

/**
 * Load user and append to req.
 */
const userByID = async (req, res, next, id) => {
    try {
        let user = await User.findById(id)
            .populate('following', '_id name')
            .populate('followers', '_id name')
            .exec()
        if (!user)
            return res.status('400').json({
                error: 'User not found',
            })
        req.profile = user
        next()
    } catch (err) {
        return res.status('400').json({
            error: 'Could not retrieve user',
        })
    }
}

const read = async (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}

/*
const list = async (req, res) => {
    try {
        let users = await User.find().select('name email updated created')
        res.json(users)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        })
    }
}
*/

const update = (req, res) => {
    try {
        const form = formidable({
            keepExtensions: true,
        })
        form.parse(req, async (err, fields, files) => {
            console.log(`Here`)
            if (err) {
                return res.status(400).json({
                    error: 'Photo could not be uploaded',
                })
            }
            let user = req.profile
            const originalValues = firstValues(form, fields)
            user = lodash.extend(user, originalValues)
            user.updated = Date.now()
            if (files.photo) {
                user.photo.data = fs.readFileSync(files.photo[0].filepath)
                user.photo.contentType = files.photo[0].mimetype
            }
            try {
                await user.save()
                user.hashed_password = undefined
                user.salt = undefined
                res.json(user)
            } catch (err) {
                return res.status(400).json({
                    error: errorHandler.getErrorMessage(err),
                })
            }
        })
    } catch (err) {
        return res.status(400).json({
            err: errorHandler.getErrorMessage(err),
        })
    }
}
const updateBeta = async (req, res) => {
    const form = new IncomingForm({ keepExtensions: true })
    console.log(`Form: ${JSON.stringify(form)}`)
    const [fields, files] = await form.parse(req)
    console.log(`Data: ${await form.parse(req)}`)
    console.log(`Files: ${files}`)

    try {
        /*
        const [fields, files] = await form.parse(req)
        console.log(`Fields: ${fields}`)
        console.log(`Files: ${files}`)
        */
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        })
    }
}
const remove = async (req, res) => {
    try {
        let user = req.profile
        let deletedUser = await user.deleteOne()
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        res.json(deletedUser)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        })
    }
}

const photo = (req, res) => {
    if (req.profile.photo.data) {
        res.set('Content-Type', req.profile.photo.contentType)
        return res.send(req.profile.photo.data)
    }
}

const addFollowing = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.body.userId, {
            $push: { following: req.body.followId },
        })
        next()
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        })
    }
}

const addFollower = async (req, res) => {
    try {
        let result = await User.findByIdAndUpdate(
            req.body.followId,
            { $push: { followers: req.body.userId } },
            { new: true },
        )
            .populate('following', '_id name')
            .populate('followers', '_id name')
            .exec()
        result.hashed_password = undefined
        result.salt = undefined
        res.json(result)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        })
    }
}

const removeFollowing = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.body.userId, {
            $pull: { following: req.body.unfollowId },
        })
        next()
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        })
    }
}
const removeFollower = async (req, res) => {
    try {
        let result = await User.findByIdAndUpdate(
            req.body.unfollowId,
            { $pull: { followers: req.body.userId } },
            { new: true },
        )
            .populate('following', '_id name')
            .populate('followers', '_id name')
            .exec()
        result.hashed_password = undefined
        result.salt = undefined
        res.json(result)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        })
    }
}

const findPeople = async (req, res) => {
    let following = req.profile.following
    following.push(req.profile._id)
    try {
        let users = await User.find({ _id: { $nin: following } }).select('name')
        res.json(users)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        })
    }
}

export default {
    create,
    userByID,
    read,
    remove,
    update,
    photo,
    addFollowing,
    addFollower,
    removeFollowing,
    removeFollower,
    findPeople,
    updateBeta,
}
