import { ImagePlus } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import auth from '../auth/auth-helper.js'
import { read, update } from './api-user.js'
import { Navigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import config from './../../config.js'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group'
import { Eye, EyeOff } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { useUser } from './../auth/userHook.jsx'

export default function EditProfile() {
    const [values, setValues] = useState({
        name: '',
        about: '',
        photo: '',
        email: '',
        password: '',
        redirectToProfile: false,
        error: '',
        id: '',
    })
    const { userId } = useParams()
    const [user, setUser] = useUser()
    const [showPassword, setShowPassword] = useState(false)
    const handlePassword = () => {
        setShowPassword(!showPassword)
    }
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        read({
            userId: userId,
        }).then((data) => {
            if (data & data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({
                    ...values,
                    id: data._id,
                    name: data.name,
                    email: data.email,
                    about: data.about,
                })
            }
        })
        return function cleanup() {
            abortController.abort()
        }
    }, [userId])

    const clickSubmit = () => {
        let userData = new FormData()
        values.name && userData.append('name', values.name)
        values.email && userData.append('email', values.email)
        values.password && userData.append('password', values.password)
        values.about && userData.append('about', values.about)
        values.photo && userData.append('photo', values.photo)
        update(
            {
                userId: userId,
            },
            userData,
        ).then((data) => {
            if (data && data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, redirectToProfile: true })
            }
        })
    }
    const handleChange = (name) => (event) => {
        const value =
            name === 'photo' ? event.target.files[0] : event.target.value
        //userData.set(name, value)
        setValues({ ...values, [name]: value })
    }
    const photoUrl = values.id
        ? `${config.BACKEND_URL}/api/users/photo/${
              values.id
          }?${new Date().getTime()}`
        : user.user.name[0]
    if (values.redirectToProfile) {
        return <Navigate to={'/user/' + values.id} />
    }
    return (
        <Card className='ring-0 mt-4 border-2 border-gray-200 w-120 mx-auto'>
            <CardContent>
                <h6
                    className={cn(
                        'text-xl font-semibold tracking-tight mx-40 my-10',
                    )}
                >
                    Edit Profile
                </h6>
                <div className='flex gap-4'>
                    <Avatar className='w-15 h-15'>
                        <AvatarImage src={photoUrl} />
                        <AvatarFallback className='text-white bg-black text-3xl'>
                            {user.user.name[0]}
                        </AvatarFallback>
                    </Avatar>
                    <br />
                    <div className='ml-auto'>
                        <input
                            accept='image/*'
                            onChange={handleChange('photo')}
                            id='icon-button-file'
                            type='file'
                            className='hidden'
                        />
                        <label htmlFor='icon-button-file'>
                            <ImagePlus />
                        </label>
                        <span>{values.photo ? values.photo.name : ''}</span>
                    </div>
                </div>
                <br />
                <div className='grid items-center gap-1.5'>
                    <Label htmlFor='name' className='text-lg mx-2'>
                        Name:
                    </Label>
                    <Input
                        id='name'
                        value={values.name}
                        onChange={handleChange('name')}
                        className='border-2 border-gray-200'
                    />
                </div>
                <br />
                <div className='grid items-center gap-1.5'>
                    <Label
                        htmlFor='multiline-flexible'
                        className='text-lg mx-2'
                    >
                        About:
                    </Label>
                    <Textarea
                        id='multiline-flexible'
                        rows='2'
                        value={values.about}
                        onChange={handleChange('about')}
                        className='border-2 border-gray-200'
                    />
                </div>
                <br />
                <div className='grid items-center gap-1.5'>
                    <Label htmlFor='email' className='text-lg mx-2'>
                        Email:
                    </Label>
                    <Input
                        id='email'
                        type='email'
                        value={values.email}
                        onChange={handleChange('email')}
                        className='border-2 border-gray-200'
                    />
                </div>
                <br />
                <Label htmlFor='password' className='text-lg mx-2'>
                    Password:
                </Label>
                <InputGroup>
                    <InputGroupInput
                        type={showPassword ? 'text' : 'password'}
                        value={values.password}
                        className='w-80 border-2 border-gray-200'
                        onChange={handleChange('password')}
                    />
                    <InputGroupAddon align='inline-end'>
                        <Button onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <Eye /> : <EyeOff />}
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
                <br />{' '}
                {values.error && (
                    <p className='leading-7 text-destructive'>
                        <Icon color='error'>error</Icon>
                        {values.error}
                    </p>
                )}
            </CardContent>
            <CardFooter>
                <Button
                    onClick={clickSubmit}
                    className={
                        (cn(buttonVariants({ variant: 'outline' })),
                        'bg-black text-white w-50 mx-auto')
                    }
                >
                    Submit
                </Button>
            </CardFooter>
        </Card>
    )
}
