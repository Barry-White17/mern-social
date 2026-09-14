// Integration Tests

import { describe, test, expect } from 'vitest'
import { read, create } from './../user/api-user.js'
import { http, HttpResponse } from 'msw'
import { signin } from './../auth/api-auth.js'
import config from './../../config.js'
import * as cookie from 'cookie'

const userSignupAndAuth = async (user) => {
    const createdUser = await create(user)
    const signinObject = {
        email: user.email,
        password: user.password,
    }
    const auth = await signin(user)
    return auth
}

describe('Api User', () => {
    test('create method should create user', async () => {
        const user = {
            name: 'TEST USER_1',
            email: 'test@user1.test',
            password: 'test@user.1',
        }
        const createdUser = await create(user)
        console.log(`Created User: ${JSON.stringify(createdUser)}`)
        expect(createdUser.message).toBe('Successfully signed up')
        expect(createdUser.user).toBeTruthy()
    })
    test('read method should return user details', async () => {
        const user = {
            name: 'TEST USER_2',
            email: 'test@user2.test',
            password: 'test@user2',
        }
        const auth = await userSignupAndAuth(user)
        const userCredentials = await read({ userId: auth.user._id })
        expect(userCredentials.following).toBeTruthy()
    })
})
