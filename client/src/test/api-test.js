import config from './../../config.js'

const globalSetup = async () => {
    try {
        let response = await fetch(
            `${config.BACKEND_URL}/api/tests/globalSetup`,
            {
                method: 'GET',
            },
        )
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}
const globalTearDown = async () => {
    try {
        let response = await fetch(
            `${config.BACKEND_URL}/api/tests/globalTearDown`,
            {
                method: 'GET',
            },
        )
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export { globalSetup, globalTearDown }
