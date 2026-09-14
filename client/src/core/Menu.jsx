import {
    House,
    User,
    LogOut,
    LogIn,
    UserPlus,
    User as UserIcon,
    LayoutDashboard,
} from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'

import { Button } from '@/components/ui/button'
import React from 'react'
import auth from '../auth/auth-helper'
import { Link, useLocation, useNavigate, NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useUser } from './../auth/userHook.jsx'
import { signout } from './../auth/api-auth.js'

const Menu = () => {
    const history = useLocation()
    const navigate = useNavigate()
    const [user, setUser] = useUser()

    const logout = () => {
        setUser(null)
        signout()
    }
    return (
        <div className='border-1 border-gray-200 bg-gray-200'>
            <div className='flex gap-3 px-3 py-5'>
                <h6 className='text-primary font-bold '>MERN Social App</h6>
                <NavLink
                    to='/'
                    end
                    className={({ isActive }) =>
                        cn(
                            'flex gap-2 text-sm hover:text-primary hover:shadow-sm rounded-md',
                            isActive && 'font-semibold',
                        )
                    }
                >
                    <House className='h-6 w-6' />
                    Home
                </NavLink>
                {!user && (
                    <div className='flex ml-auto gap-4'>
                        <NavLink
                            to='/signup'
                            end
                            className={({ isActive }) =>
                                cn(
                                    'hover:shadow-sm flex gap-2 text-sm hover:text-primary',
                                    isActive && 'font-semibold',
                                )
                            }
                        >
                            <UserPlus className='h-6 w-6 ' />
                            SignUp
                        </NavLink>
                        <NavLink
                            to='/signin'
                            end
                            className={({ isActive }) =>
                                cn(
                                    'flex gap-2 text-sm',
                                    isActive && 'font-semibold hover:shadow-sm',
                                )
                            }
                        >
                            <LogIn className='h-6 w-6' />
                            Sign In
                        </NavLink>
                    </div>
                )}
                {user && (
                    <div className='flex ml-auto gap-4'>
                        <NavLink
                            to={'/user/' + user.user._id}
                            end
                            className={({ isActive }) =>
                                cn(
                                    'flex gap-2 text-sm',
                                    isActive && 'font-semibold',
                                )
                            }
                        >
                            <UserIcon className='w-6 h-6' />
                            My Profile
                        </NavLink>
                        <Button
                            variant='primary'
                            onClick={logout}
                            className={cn('flex gap-2 text-sm')}
                        >
                            <LogOut className='w-6 h-6' />
                            LogOut
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Menu
