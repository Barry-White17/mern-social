import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import unicornbikeImg from './../assets/images/unicornbike.jpg'
import auth from '../auth/auth-helper'
import FindPeople from '../user/FindPeople'
import Newsfeed from '../post/Newsfeed'
import { useUser } from './../auth/userHook.jsx'

export default function Home({ history }) {
    const [defaultPage, setDefaultPage] = useState(false)
    const [user, setUser] = useUser()

    return (
        <div className='container border-2 border-gray-200'>
            {!user && (
                <div className='grid gap-16 grid-cols-2'>
                    <div className='col-span-12'>
                        <Card className='ring-0'>
                            <h6
                                className={cn(
                                    'scroll-m-20 text-base font-semibold tracking-tight',
                                )}
                            >
                                Home Page
                            </h6>
                            <CardContent>
                                <p className='leading-7' type='body1'>
                                    Welcome to the MERN Social home page.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
            {user && (
                <div className='grid gap-16 grid-cols-12'>
                    <div className='col-span-8 sm:col-span-7'>
                        <Newsfeed />
                    </div>
                    <div className='col-span-6 sm:col-span-5 bg-gray-200'>
                        <FindPeople />
                    </div>
                </div>
            )}
        </div>
    )
}
