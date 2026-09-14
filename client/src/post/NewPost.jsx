import { Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import React, { useState, useEffect } from 'react'
import auth from '../auth/auth-helper.js'
import PropTypes from 'prop-types'
import { create } from './api-post.js'
import config from './../../config.js'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useUser } from './../auth/userHook.jsx'

export default function NewPost(props) {
    const [values, setValues] = useState({
        text: '',
        photo: '',
        error: '',
        user: {},
    })
    const [user, setUser] = useUser()
    useEffect(() => {
        setValues({ ...values, user: user.user })
    }, [])
    const clickPost = () => {
        let postData = new FormData()
        postData.append('text', values.text)
        postData.append('photo', values.photo)
        create(
            {
                userId: user.user._id,
            },
            postData,
        ).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, text: '', photo: '' })
                props.addUpdate(data)
            }
        })
    }
    const handleChange = (name) => (event) => {
        const value =
            name === 'photo' ? event.target.files[0] : event.target.value
        setValues({ ...values, [name]: value })
    }
    const photoURL = values.user._id
        ? `${config.BACKEND_URL}/api/users/photo/${values.user._id}`
        : user.user.name[0]
    return (
        <div className='container mx-auto border-2 border-gray-200 ring-0 rounded-lg bg-white'>
            <Card className='ring-0'>
                <CardHeader>
                    <div className='flex gap-2'>
                        <Avatar className='w-9 h-9 ring-0'>
                            <AvatarImage
                                className='ring-0'
                                src={photoURL}
                                alt={user.user.name[0]}
                            />
                            <AvatarFallback className='ring-0 border-2 border-gray-200 text-gray hover:shadow-sm bg-black text-white'>
                                {user.user.name[0]}
                            </AvatarFallback>
                        </Avatar>
                        <CardTitle>{values.user.name}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className='grid items-center gap-1.5'>
                        <Textarea
                            rows='3'
                            placeholder='Share your thoughts ...'
                            value={values.text}
                            onChange={handleChange('text')}
                            className='ring-0 border-2 border-gray-200'
                        />
                    </div>
                    <input
                        accept='image/*'
                        onChange={handleChange('photo')}
                        id='icon-button-file'
                        type='file'
                        className='hidden'
                    />
                    <label htmlFor='icon-button-file'>
                        <Camera className='w-7 h-7 mt-3' />
                    </label>{' '}
                    <span>{values.photo ? values.photo.name : ''}</span>
                    {values.error && (
                        <p>
                            <Icon color='error'>error</Icon>
                            {values.error}
                        </p>
                    )}
                </CardContent>
                <CardFooter>
                    <Button
                        disabled={values.text === ''}
                        onClick={clickPost}
                        className={cn(
                            buttonVariants({ variant: 'outline' }),
                            'w-65 mx-auto bg-black text-white',
                        )}
                    >
                        POST
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

NewPost.propTypes = {
    addUpdate: PropTypes.func.isRequired,
}
