import { Button, buttonVariants } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardFooter,
    CardDescription,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import auth from './auth-helper.js'
import { Navigate } from 'react-router-dom'
import { signin } from './api-auth.js'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group'
import { Eye, EyeOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

// useUser custom provides necessary user credentials for custom rendering and other necessary services
import { useUser } from './userHook.jsx'

export default function Signin(props) {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        redirectToReferrer: false,
    })
    const [user, setUser] = useUser()
    const [showPassword, setShowPassword] = useState(false)
    const handlePassword = () => {
        setShowPassword(!showPassword)
    }
    const clickSubmit = () => {
        const user = {
            email: values.email || undefined,
            password: values.password || undefined,
        }

        signin(user).then((data) => {
            if (data && data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setUser(data)
                setValues({
                    ...values,
                    error: '',
                    redirectToReferrer: true,
                })
            }
        })
    }
    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value })
    }
    const signinMutation = useMutation({
        mutationFn: () => clickSubmit(),
    })
    const handleSignin = (e) => {
        e.preventDefault()
        signinMutation.mutate()
    }
    if (values.redirectToReferrer) {
        return <Navigate to='/' />
    }

    return (
        <div className='container px-3 py-4 mx-auto items-center'>
            <Card className='border-2 border-gray-200 w-100 mx-auto ring-0 hover:shadow-lg'>
                <CardTitle className='text-lg font-bold mx-auto py-3'>
                    SignIn
                </CardTitle>
                <div className='grid mx-auto gap-1.5'>
                    <Label htmlFor='email' className='text-lg mx-2'>
                        Email:
                    </Label>
                    <Input
                        type='email'
                        value={values.email}
                        onChange={handleChange('email')}
                        className=' w-80 border-2 border-gray-200'
                    />
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
                            <Button
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <Eye /> : <EyeOff />}
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                </div>
                <Button
                    onClick={(e) => handleSignin(e)}
                    className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'w-90 mx-auto bg-black text-white',
                    )}
                >
                    Submit
                </Button>
                <div className='flex mx-auto gap-3'>
                    <p className='text-sm text-muted-foreground border-transparent font-'>
                        Don't have an account?
                    </p>
                    <Link
                        to='/signup'
                        className='font-semibold hover:underline'
                    >
                        SignUp
                    </Link>
                </div>
            </Card>
        </div>
    )
}
