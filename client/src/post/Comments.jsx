import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CardHeader, CardTitle } from '@/components/ui/card'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { comment, uncomment } from './api-post.js'
import { Link } from 'react-router-dom'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import config from './../../config.js'
import { useUser } from './../auth/userHook.jsx'
import { Input } from '@/components/ui/input'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export default function Comments(props) {
    const [text, setText] = useState('')
    const [user, setUser] = useUser()
    const handleChange = (event) => {
        setText(event.target.value)
    }
    const addComment = (event) => {
        if (event.keyCode == 13 && event.target.value) {
            event.preventDefault()
            comment(
                {
                    userId: user.user._id,
                },
                props.postId,
                { text: text },
            ).then((data) => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    setText('')
                    props.updateComments(data.comments)
                }
            })
        }
    }

    const deleteComment = (comment) => (event) => {
        uncomment(
            {
                userId: user.user._id,
            },
            props.postId,
            comment,
        ).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                props.updateComments(data.comments)
            }
        })
    }

    const commentBody = (item) => {
        return (
            <p>
                <CardHeader className='bg-gray-100'>
                    <div className='mt-2 flex gap-2'>
                        <Avatar className='border-2 border-gray-200'>
                            <AvatarImage
                                src={`${config.BACKEND_URL}/api/users/photo/${item.postedBy._id}`}
                                alt={user.user.name[0]}
                                className='border-2 border-gray-200'
                            />
                            <AvatarFallback className='text-white bg-black border-2 border-gray-200'>
                                {user.user.name[0]}
                            </AvatarFallback>
                        </Avatar>
                        <Link to={'/user/' + item.postedBy._id}>
                            {item.postedBy.name}
                        </Link>
                    </div>
                    <div className='bg-white'>
                        {item.text}
                        <div className='text-xs'>
                            {new Date(item.created).toDateString()} |
                            {user.user._id === item.postedBy._id && (
                                <Button
                                    variant='ghost'
                                    size='icon'
                                    onClick={deleteComment(item)}
                                >
                                    <Trash2 fill='black' />
                                </Button>
                            )}
                        </div>
                    </div>
                </CardHeader>
            </p>
        )
    }

    return (
        <div>
            <CardHeader>
                <CardTitle>
                    {
                        <Input
                            onKeyDown={addComment}
                            multiline
                            value={text}
                            onChange={handleChange}
                            placeholder='Write something ...'
                            margin='normal'
                            className={cn('w-90')}
                        />
                    }
                </CardTitle>
            </CardHeader>
            {props.comments.map((item, i) => {
                return (
                    <CardHeader key={i}>
                        <CardTitle>{commentBody(item)}</CardTitle>
                    </CardHeader>
                )
            })}
        </div>
    )
}

Comments.propTypes = {
    postId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    updateComments: PropTypes.func.isRequired,
}
