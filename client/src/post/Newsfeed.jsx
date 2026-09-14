import { Card, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import React, { useState, useEffect } from 'react'
import auth from '../auth/auth-helper.js'
import PostList from './PostList.jsx'
import { listNewsFeed } from './api-post.js'
import NewPost from './NewPost.jsx'
import { useUser } from './../auth/userHook.jsx'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export default function Newsfeed() {
    const [user, setUser] = useUser()
    const queryClient = useQueryClient()

    /*
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        listNewsFeed(
            {
                userId: user.user._id,
            },
            signal,
        ).then((data) => {
            if (data && data.error) {
                console.log(data.error)
            } else {
                setPosts(data)
            }
        })
        return function cleanup() {
            abortController.abort()
        }
    }, [])
    */
    useQuery({
        queryKey: ['allPosts', user.user._id],
        queryFn: () => listNewsFeed({ userId: user.user._id }),
    })

    const addPost = (post) => {
        const updatedPosts = queryClient.getQueryData([
            'allPosts',
            user.user._id,
        ])
        updatedPosts.unshift(post)
        queryClient.setQueryData(['allPosts', user.user._id], updatedPosts)
    }
    const removePost = (post) => {
        const updatedPosts = queryClient.getQueryData([
            'allPosts',
            user.user._id,
        ])
        const index = updatedPosts.indexOf(post)
        updatedPosts.splice(index, 1)
        queryClient.setQueryData(['allPosts', user.user._id], updatedPosts)
    }
    const postListData = queryClient.getQueryData(['allPosts', user.user._id])
        ? queryClient.getQueryData(['allPosts', user.user._id])
        : []
    return (
        <Card className='ring-0 px-3 py-5 border-2 border-gray-300 mt-4 mx-2 bg-gray-200'>
            <CardDescription className='font-semibold text-lg'>
                Newsfeed
            </CardDescription>
            <NewPost addUpdate={addPost} />
            <PostList removeUpdate={removePost} posts={postListData} />
        </Card>
    )
}
