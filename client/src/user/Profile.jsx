import { Pencil } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import React, { useState, useEffect } from 'react'
import DeleteUser from './DeleteUser.jsx'
import auth from '../auth/auth-helper.js'
import { read } from './api-user.js'
import { Navigate, Link } from 'react-router-dom'
import FollowProfileButton from './FollowProfileButton.jsx'
import ProfileTabs from './ProfileTabs.jsx'
import { listByUser } from '../post/api-post.js'
import { useParams } from 'react-router-dom'
import config from './../../config.js'
import { buttonVariants } from '@/components/ui/button'

import {
    Item,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemTitle,
} from '@/components/ui/item'

import { useUser } from './../auth/userHook.jsx'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
    const [values, setValues] = useState({
        user: { following: [], followers: [] },
        redirectToSignin: false,
        following: false,
    })

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { userId } = useParams()
    const [posts, setPosts] = useState([])
    const [user, setUser] = useUser()

    /*
    useEffect(() => {
        const abortController = new AbortController()

        read({
            userId: userId,
        }).then((data) => {
            if (data && data.error) {
                setValues({ ...values, redirectToSignin: true })
            } else {
                let following = checkFollow(data)
                setValues({ ...values, user: data, following: following })
                loadPosts(data._id)
            }
        })
        return function cleanup() {
            abortController.abort()
        }
    }, [userId])
    */

    useQuery({
        queryKey: ['userInfo', user.user._id],
        queryFn: () => read({ userId: user.user._id }),
    })

    const userData = queryClient.getQueryData(['userInfo', user.user._id])
        ? queryClient.getQueryData(['userInfo', user.user._id])
        : []

    const checkFollow = (userObject) => {
        const match = userObject.followers.some((follower) => {
            return follower._id == user.user._id
        })
        return match
    }
    const clickFollowButton = (callApi) => {
        callApi(
            {
                userId: user.user._id,
            },
            userData._id,
        ).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({
                    ...values,
                    user: data,
                    following: !values.following,
                })
            }
        })
    }

    /*
    const loadPosts = (user) => {
        listByUser({
            userId: user,
        }).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                setPosts(data)
            }
        })
    }
    */

    useQuery({
        queryKey: ['userPosts', user.user._id],
        queryFn: () => listByUser({ userId: user.user._id }),
        onError: () => console.log(`Error: ${data.error}`),
    })
    const userPosts = queryClient.getQueryData(['userPosts', user.user._id])
        ? queryClient.getQueryData(['userPosts', user.user._id])
        : []
    const removePost = (post) => {
        const updatedPosts =
            queryClient.getQueryData(['userPosts', user.user._id]) || []
        const index = updatedPosts.indexOf(post)
        updatedPosts.splice(index, 1)
        queryClient.setQueryData(['userPosts', user.user._id], updatedPosts)
    }

    const photoUrl =
        values.user._id &&
        `${config.BACKEND_URL}/api/users/photo/${
            userData._id
        }?${new Date().getTime()}`
    return (
        <div
            className={cn(
                'rounded-lg mt-3 border-2 border-gray-200 hover:shadow-lg w-150 mx-auto',
            )}
        >
            <h6
                className={cn('font-semibold tracking-tight mx-7 my-8 text-xl')}
            >
                Profile
            </h6>
            <div className='flex gap-6 mx-5'>
                <Avatar className='w-15 h-15 mb-3'>
                    <AvatarImage src={photoUrl} />
                    <AvatarFallback className='bg-black text-white text-4xl'>
                        {user.user.name[0]}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <div className='font-semibold text-xl'>{userData.name}</div>
                    <div>{userData.email}</div>
                </div>
                {userData && user.user._id == userData._id ? (
                    <span className='ml-auto'>
                        <Link to={'/user/edit/' + userData._id}>
                            <Button
                                variant='ghost'
                                size='icon'
                                aria-label='Edit'
                                className='w-10 h-10'
                            >
                                <Pencil fill='gray' />
                            </Button>
                        </Link>
                        <DeleteUser userId={userData._id} />
                    </span>
                ) : (
                    <FollowProfileButton
                        following={userData.following}
                        onButtonClick={clickFollowButton}
                    />
                )}
            </div>
            <Separator className='border-1 border-gray-200' />
            <div className='mx-5 my-4'>
                <div className='text-lg font-semibold mb-3'>
                    {userData.about}
                </div>
                <div className='text-sm text-muted-foreground'>
                    {'Joined: ' + new Date(userData.created).toDateString()}
                </div>
            </div>
            <Separator className='border-1 border-gray-200' />
            <div>
                <ProfileTabs
                    user={userData}
                    posts={userPosts}
                    removePostUpdate={removePost}
                />
            </div>
        </div>
    )
}
