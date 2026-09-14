import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardFooter,
    CardTitle,
    CardDescription,
} from '@/components/ui/card'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { create } from './api-user.js'
import { Link } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group'
import { useMutation } from '@tanstack/react-query'

export default function Signup() {
    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
        open: false,
        error: '',
    })
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const handlePassword = () => {
        setShowPassword(!showPassword)
    }
    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value })
    }
    const clickSubmit = () => {
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined,
        }
        create(user).then((data) => {
            if (data && data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, error: '', open: true })
                navigate('/signin')
            }
        })
    }
    const createUserMutation = useMutation({
        mutationFn: () => clickSubmit(),
    })
    const createUser = (e) => {
        e.preventDefault()
        createUserMutation.mutate()
    }
    return (
        <div className='container px-3 py-4 mx-auto items-center'>
            <Card className='border-2 border-gray-200 w-100 mx-auto ring-0 hover:shadow-lg'>
                <CardTitle className='text-lg font-bold mx-auto py-3'>
                    SignUp
                </CardTitle>
                <div className='grid mx-auto gap-1.5'>
                    <Label htmlFor='name' className='text-lg mx-2'>
                        Name:
                    </Label>
                    <Input
                        type='text'
                        value={values.name}
                        onChange={handleChange('name')}
                        className=' w-80 border-2 border-gray-200'
                    />
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
                    onClick={(e) => createUser(e)}
                    className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'w-90 mx-auto bg-black text-white',
                    )}
                >
                    Submit
                </Button>
                <div className='flex mx-auto gap-3'>
                    <p className='text-sm text-muted-foreground border-transparent font-'>
                        Already have an account?
                    </p>
                    <Link
                        to='/signin'
                        className='font-semibold hover:underline'
                    >
                        LogIn
                    </Link>
                </div>
            </Card>
        </div>
    )
}
