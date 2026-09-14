import { useUser } from './userHook.jsx'

const PrivateRoute = ({ children }) => {
    const [user, setUser] = useUser()
    if (user) {
        return children
    }
    if (!user) {
        return
    }
}

export default PrivateRoute
