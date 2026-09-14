import { ThumbsUp, MessageSquare, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import auth from '../auth/auth-helper.js'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { remove, like, unlike } from './api-post.js'
import Comments from './Comments.jsx'
import config from './../../config.js'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUser } from './../auth/userHook.jsx'

export default function Post(props) {
    const jwt = auth.isAuthenticated()
    const [user, setUser] = useUser()
    const checkLike = (likes) => {
        let match = likes.indexOf(user.user._id) !== -1
        return match
    }
    const [values, setValues] = useState({
        like: checkLike(props.post.likes),
        likes: props.post.likes.length,
        comments: props.post.comments,
    })

    // useEffect(() => {
    //   setValues({...values, like:checkLike(props.post.likes), likes: props.post.likes.length, comments: props.post.comments})
    // }, [])

    const clickLike = () => {
        let callApi = values.like ? unlike : like
        callApi(
            {
                userId: user.user._id,
            },
            props.post._id,
        ).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                setValues({
                    ...values,
                    like: !values.like,
                    likes: data.likes.length,
                })
            }
        })
    }

    const updateComments = (comments) => {
        setValues({ ...values, comments: comments })
    }

    const deletePost = () => {
        remove({
            postId: props.post._id,
        }).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                props.onRemove(props.post)
            }
        })
    }

    return (
        <Card className='ring-0 border-2 border-gray-200 bg-white hover:shadow-xl'>
            <CardHeader>
                <CardTitle>
                    <div className='flex gap-2'>
                        <Avatar className='ring-0 border-2 border-gray-200 w-9 h-9'>
                            <AvatarImage
                                className='ring-0 border-2 border-gray-200'
                                src={`${config.BACKEND_URL}/api/users/photo/${props.post.postedBy._id}`}
                                alt={user.user.name[0]}
                            />
                            <AvatarFallback className='ring-0 border-2 border-gray-200 bg-black text-white'>
                                {user.user.name[0]}
                            </AvatarFallback>
                        </Avatar>
                        <Link
                            to={'/user/' + props.post.postedBy._id}
                            className='hover:underline'
                        >
                            {props.post.postedBy.name}
                        </Link>
                        <div className='ml-auto'>
                            <Button onClick={deletePost}>
                                <Trash />
                            </Button>
                        </div>
                    </div>
                </CardTitle>
                <CardDescription>
                    {new Date(props.post.created).toDateString()}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className={cn('mb-2 font-semibold')}>{props.post.text}</p>
                {props.post.photo && (
                    <div>
                        <img
                            src={
                                `${config.BACKEND_URL}/api/posts/photo/` +
                                props.post._id
                            }
                        />
                    </div>
                )}
            </CardContent>
            <CardFooter>
                <div>
                    {values.like ? (
                        <Button
                            variant='ghost'
                            size='icon'
                            onClick={clickLike}
                            aria-label='Like'
                            className='gap-2 w-5 h-5 mx-3'
                        >
                            <ThumbsUp fill='black' />
                            {values.likes}
                        </Button>
                    ) : (
                        <Button
                            variant='ghost'
                            size='icon'
                            onClick={clickLike}
                            aria-label='Unlike'
                            className='gap-2 w-5 h-5 mx-3'
                        >
                            <ThumbsUp />
                            {values.likes}
                        </Button>
                    )}{' '}
                    <Button
                        variant='ghost'
                        size='icon'
                        aria-label='Comment'
                        className='gap-2'
                    >
                        <MessageSquare fill='gray' className='w-5-h-5' />
                        {values.comments.length}
                    </Button>{' '}
                </div>
            </CardFooter>
            <Separator />
            <Comments
                postId={props.post._id}
                comments={values.comments}
                updateComments={updateComments}
            />
        </Card>
    )
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired,
}
