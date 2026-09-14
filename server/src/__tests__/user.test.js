import { describe, test, expect, jest } from '@jest/globals'
import mongoose from 'mongoose'
import userCtrl from './../controllers/user.controller.js'
import userController from './../controllers/user.controller.js'
import httpMocks from 'node-mocks-http'
import testImage from './../assets/test_image.jpg'

// Proxy's let us intercept and customize operations performed on objects

const createUserAndUserById = async (user) => {
    const postReq = httpMocks.createRequest({
        method: 'POST',
        body: user,
    })
    const getReq = httpMocks.createRequest({
        method: 'GET',
    })
    const res = httpMocks.createResponse()
    await userController.create(postReq, res)
    const next = jest.fn()
    const data = res._getJSONData()
    await userController.userByID(getReq, res, next, data.user)
    return { getReq, res }
}

describe('User Model', () => {
    test('create method should create user with name, email, password', async () => {
        const user = {
            name: 'TEST USER_1',
            email: 'testuser1@test.user',
            password: 'testuser',
        }
        const postReq = httpMocks.createRequest({
            method: 'POST',
            body: user,
        })
        const res = httpMocks.createResponse()
        await userCtrl.create(postReq, res)
        const data = res._getJSONData()
        expect(data.message).toBe('Successfully signed up')
        // mongoose.Types.ObjectId returned via res object is not more of class mongoose.Types.ObjectId
        expect(data.user).toBeTruthy()
    })
    test('create method should fail without any required field', async () => {
        const user = {
            name: 'TEST USER_2',
            email: 'testuser2@test.user',
        }
        const postReq = httpMocks.createRequest({
            method: 'POST',
            body: user,
        })
        const res = httpMocks.createResponse()
        try {
            await userController.create(postReq, res)
        } catch (err) {
            expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
            expect(err.message).toBe('password is required')
        }
    })
    test('userByID should return user with followings and followers', async () => {
        const user = {
            name: 'TEST USER_3',
            email: 'testuser3@test.com',
            password: 'testuser3',
        }
        const { getReq } = await createUserAndUserById(user)
        expect(getReq.profile.following).toBeTruthy()
        expect(getReq.profile.followers).toBeTruthy()
    })
    test('read method should return user data without hashed_password and salt', async () => {
        const user = {
            name: 'TEST USER_4',
            email: 'testuser4@test.test',
            password: 'testuser4',
        }
        const { getReq, res } = await createUserAndUserById(user)

        await userController.read(getReq, res)
        expect(getReq.profile._id).toBeInstanceOf(mongoose.Types.ObjectId)
        expect(getReq.profile.hashed_password).toBeFalsy()
        expect(getReq.profile.salt).toBeFalsy()
        expect(getReq.profile.name).toBeTruthy()
    })
    test('update method should update specified user data', async () => {
        const user = {
            name: 'TEST USER_7',
            email: 'test@user7.test',
            password: 'testuser7',
        }
        const { getReq } = await createUserAndUserById(user)
        const updateObject = {
            email: 'test7@user.test',
            about: 'I am still Prescient',
        }
        const updateForm = new FormData()
        updateForm.append('email', updateObject.email)
        updateForm.append('about', updateObject.about)
        updateForm.append('photo', testImage)
        const postReq = httpMocks.createRequest({
            method: 'POST',
            body: updateForm,
            profile: getReq.profile,
        })
        const res = httpMocks.createResponse()
        await userController.updateBeta(postReq, res)
        console.log(`Res Data: ${res._getData()}`)
    })
})
