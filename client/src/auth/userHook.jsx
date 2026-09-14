import { createContext, useState, useContext } from 'react'
import PropTypes from 'prop-types'

// UseContext implies automatic escaping, by rendering data embedded in {} as a string
// Automatic escaping fails when escaped by flags like dangerously_rendered_html

export const UserContext = createContext({
    user: null,
    setUser: () => {},
})

// Context Provider component, that provides context with state hook
export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

UserContextProvider.propTypes = {
    children: PropTypes.element.isRequired,
}

export const useUser = () => {
    const { user, setUser } = useContext(UserContext)
    return [user, setUser]
}

// Hook to use the above context with useState like api
