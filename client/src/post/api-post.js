import config from './../../config.js'

const create = async (params, post) => {
    try {
        let response = await fetch(
            `${config.BACKEND_URL}/api/posts/new/${params.userId}`,
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                },
                body: post,
            },
        )
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const listByUser = async (params) => {
    try {
        let response = await fetch(
            `${config.BACKEND_URL}/api/posts/by/${params.userId}`,
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

const listNewsFeed = async (params) => {
    try {
        let response = await fetch(
            `${config.BACKEND_URL}/api/posts/feed/${params.userId}`,
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

const remove = async (params) => {
    try {
        let response = await fetch(
            `${config.BACKEND_URL}/api/posts/${params.postId}`,
            {
                method: 'DELETE',
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

const like = async (params, postId) => {
    try {
        let response = await fetch(`${config.BACKEND_URL}/api/posts/like/`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: params.userId, postId: postId }),
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const unlike = async (params, postId) => {
    try {
        let response = await fetch(`${config.BACKEND_URL}/api/posts/unlike/`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: params.userId, postId: postId }),
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const comment = async (params, postId, comment) => {
    try {
        let response = await fetch(`${config.BACKEND_URL}/api/posts/comment/`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: params.userId,
                postId: postId,
                comment: comment,
            }),
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const uncomment = async (params, postId, comment) => {
    try {
        let response = await fetch(
            `${config.BACKEND_URL}/api/posts/uncomment/`,
            {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: params.userId,
                    postId: postId,
                    comment: comment,
                }),
            },
        )
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export {
    listNewsFeed,
    listByUser,
    create,
    remove,
    like,
    unlike,
    comment,
    uncomment,
}
