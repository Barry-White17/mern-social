import React from 'react'
import MainRouter from './MainRouter'
import { BrowserRouter } from 'react-router-dom'
import { UserContextProvider } from './auth/userHook.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const defaultOptions = {
    queries: {
        gcTime: 60 * 1000,
        staleTime: 5 * 60 * 1000,
    },
}

const queryClient = new QueryClient({
    defaultOptions,
})

const App = () => {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <UserContextProvider>
                    <MainRouter />
                </UserContextProvider>
            </QueryClientProvider>
        </BrowserRouter>
    )
}

export default App
