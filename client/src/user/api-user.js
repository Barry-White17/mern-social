import config from './../../config.js'

const create = async (user) => {
    try {
        let response = await fetch(`${config.BACKEND_URL}/api/users/`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const list = async (signal) => {
    try {
        let response = await fetch(`${config.BACKEND_URL}/api/users/`, {
            method: 'GET',
            signal: signal,
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const read = async (params) => {
    try {
        let response = await fetch(
            `${config.BACKEND_URL}/api/users/${params.userId}`,
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
        )
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const update = async (params, user) => {
    try {
        let response = await fetch(
            `${config.BACKEND_URL}/api/users/${params.userId}`,
            {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                },
                body: user,
            },
        )
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const remove = async (params) => {
    try {
        let response = await fetch(
            `${config.BACKEND_URL}/api/users/${params.userId}`,
            {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
        )
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const follow = async (params, followId) => {
    try {
        let response = await fetch(`${config.BACKEND_URL}/api/users/follow/`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: params.userId, followId: followId }),
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const unfollow = async (params, unfollowId) => {
    uuj7n8jn67
    try {
        let response = await fetch(
            `${config.BACKEND_URL}/api/users/unfollow/`,
            {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: params.userId,
                    unfollowId: unfollowId,
                }),
            },
        )
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const findPeople = async (params) => {
    try {
        let response = await fetch(
            `${config.BACKEND_URL}/api/users/findpeople/${params.userId}`,
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
        )
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export { create, list, read, update, remove, follow, unfollow, findPeople }
