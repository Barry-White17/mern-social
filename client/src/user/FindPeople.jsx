import { Eye } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { findPeople, follow } from './api-user.js'
import auth from '../auth/auth-helper.js'
import config from './../../config.js'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import {
    Item,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemTitle,
} from '@/components/ui/item'

import { Separator } from '@/components/ui/separator'

import {
    Card,
    CardHeader,
    CardDescription,
    CardFooter,
} from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import { useUser } from './../auth/userHook.jsx'

export default function FindPeople() {
    const [values, setValues] = useState({
        users: [],
    })
    const [user, setUser] = useUser()
    const queryClient = useQueryClient()

    /*
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        findPeople({
            userId: user.user._id,
        }).then((data) => {
            if (data && data.error) {
                console.log(data.error)
            } else {
                setValues({ ...values, users: data })
            }
        })
        return function cleanup() {
            abortController.abort()
        }
    }, [])
    */
    const clickFollow = (userData, index) => {
        follow(
            {
                userId: user.user._id,
            },
            userData._id,
        ).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                let toFollow = values.users
                toFollow.splice(index, 1)
                setValues({
                    ...values,
                    users: toFollow,
                })
            }
        })
    }
    const handleRequestClose = (event, reason) => {
        setValues({ ...values, open: false })
    }
    useQuery({
        queryKey: ['peopleToFollow', user.user._id],
        queryFn: () => findPeople({ userId: user.user._id }),
    })
    const usersToFollow = queryClient.getQueryData([
        'peopleToFollow',
        user.user._id,
    ])
        ? queryClient.getQueryData(['peopleToFollow', user.user._id])
        : []
    return (
        <div className='mt-3 bg-white'>
            <div
                className={cn(
                    'rounded-lg border bg-card text-card-foreground shadow-sm border-2 border-gray-200',
                )}
            >
                <p className={cn('font-semibold mx-2 my-2')} type='title'>
                    Who to follow
                </p>
                <ItemGroup>
                    {usersToFollow.map((item, i) => {
                        return (
                            <Item key={i}>
                                <ItemContent>
                                    <Separator
                                        fill='gray'
                                        className='border-1 border-white-100 mb-2'
                                    />
                                    <div className='flex gap-2'>
                                        <Avatar>
                                            <AvatarImage
                                                className='gap-2 w-8 h-8'
                                                src={`${config.BACKEND_URL}/api/users/photo/${item._id}`}
                                            />
                                            <AvatarFallback className='text-white bg-black gap-2 w-8 h-8'>
                                                {item.name[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <ItemTitle>{item.name}</ItemTitle>
                                        <div className='ml-auto'>
                                            <Link to={'/user/' + item._id}>
                                                <Button
                                                    size='icon'
                                                    className={cn(
                                                        'hover:shadow-sm',
                                                    )}
                                                >
                                                    <Eye className='w-1 h-1' />
                                                </Button>
                                            </Link>
                                            <Button
                                                aria-label='Follow'
                                                onClick={() => {
                                                    clickFollow(item, i)
                                                }}
                                                className={cn(
                                                    buttonVariants({
                                                        variant: 'outline',
                                                    }),
                                                    'ml-2 w-40 bg-black text-white',
                                                )}
                                            >
                                                Follow
                                            </Button>
                                        </div>
                                    </div>
                                </ItemContent>
                            </Item>
                        )
                    })}
                </ItemGroup>
            </div>
        </div>
    )
}
