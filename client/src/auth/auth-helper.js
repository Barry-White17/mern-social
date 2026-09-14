import { signout } from './api-auth.js'
import { useUser } from './userHook.jsx'

const auth = {
    isAuthenticated() {
        if (typeof window == 'undefined') return false

        if (sessionStorage.getItem('jwt'))
            return JSON.parse(sessionStorage.getItem('jwt'))
        else return false
    },
    authenticate(userData, cb) {
        const [user, setUser] = useUser()
        setUser(userData)
        cb()
    },
    clearJWT(cb) {
        if (typeof window !== 'undefined') sessionStorage.removeItem('jwt')
        cb()
        //optional
        signout().then((data) => {
            document.cookie =
                't=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        })
    },
}

export default auth
