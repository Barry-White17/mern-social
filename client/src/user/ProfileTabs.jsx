import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import FollowGrid from './FollowGrid'
import PostList from '../post/PostList'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// relative positions document relative to it's document flow
// absolute positions document relative to its nearest positioned ancestor with properties relative, fixed just to name a few

export default function ProfileTabs(props) {
    return (
        <Tabs defaultValue='posts' orientation='vertical'>
            <TabsList variant='line'>
                <TabsTrigger value='posts' className='text-xl mx-12'>
                    Posts
                </TabsTrigger>
                <TabsTrigger value='following' className='text-xl mx-12'>
                    Following
                </TabsTrigger>
                <TabsTrigger value='followers' className='text-xl mx-12'>
                    Followers
                </TabsTrigger>
            </TabsList>
            <TabsContent value='posts' className='absolute w-150 my-1 mt-11'>
                <PostList
                    removeUpdate={props.removePostUpdate}
                    posts={props.posts}
                />
            </TabsContent>
            <TabsContent
                value='following'
                className='absolute w-150 my-1 mt-11'
            >
                <FollowGrid people={props.user.following} />
            </TabsContent>
            <TabsContent
                value='followers'
                className='absolute w-150 my-1 mt-11'
            >
                <FollowGrid people={props.user.followers} />
            </TabsContent>
        </Tabs>
    )
}

ProfileTabs.propTypes = {
    user: PropTypes.object.isRequired,
    removePostUpdate: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
}
