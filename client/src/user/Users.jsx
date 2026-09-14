import { ArrowRight, User } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { list } from './api-user.js'

export default function Users() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        list(signal).then((data) => {
            if (data && data.error) {
                console.log(data.error)
            } else {
                setUsers(data)
            }
        })

        return function cleanup() {
            abortController.abort()
        }
    }, [])

    return (
        <div
            className={cn(
                'rounded-lg border bg-card text-card-foreground shadow-sm',
            )}
        >
            <h6
                className={cn(
                    'scroll-m-20 text-base font-semibold tracking-tight',
                )}
            >
                All Users
            </h6>
            <ul>
                {users.map((item, i) => {
                    return (
                        <Link to={'/user/' + item._id} key={i}>
                            <li button className='flex items-center'>
                                <span className='mr-3 inline-flex'>
                                    <Avatar>
                                        <AvatarFallback>
                                            <User />
                                        </AvatarFallback>
                                    </Avatar>
                                </span>
                                <div className='flex flex-col'>
                                    <span>{item.name}</span>
                                </div>
                                <span className='ml-auto'>
                                    <Button variant='ghost' size='icon'>
                                        <ArrowRight />
                                    </Button>
                                </span>
                            </li>
                        </Link>
                    )
                })}
            </ul>
        </div>
    )
}
