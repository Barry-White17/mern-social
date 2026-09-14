import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
} from '@/components/ui/dialog'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import auth from './../auth/auth-helper'
import { remove } from './api-user.js'
import { Navigate } from 'react-router-dom'

export default function DeleteUser(props) {
    const [open, setOpen] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const jwt = auth.isAuthenticated()
    const clickButton = () => {
        setOpen(true)
    }
    const deleteAccount = () => {
        remove({
            userId: props.userId,
        }).then((data) => {
            if (data && data.error) {
                console.log(data.error)
            } else {
                auth.clearJWT(() => console.log('deleted'))
                setRedirect(true)
            }
        })
    }
    const handleRequestClose = () => {
        setOpen(false)
    }

    if (redirect) {
        return <Navigate to='/' />
    }
    return (
        <span>
            <Button
                variant='ghost'
                size='icon'
                aria-label='Delete'
                onClick={clickButton}
            >
                <Trash2 fill='gray' />
            </Button>

            <Dialog
                open={open}
                onOpenChange={handleRequestClose}
                className='bg-background ring-0'
            >
                <DialogContent className='bg-gray-300 ring-0'>
                    <DialogTitle>{'Delete Account'}</DialogTitle>

                    <DialogDescription>
                        Confirm to delete your account.
                    </DialogDescription>

                    <DialogFooter>
                        <Button variant='ghost' onClick={handleRequestClose}>
                            Cancel
                        </Button>
                        <Button
                            variant='ghost'
                            onClick={deleteAccount}
                            autoFocus='autoFocus'
                        >
                            Confirm
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </span>
    )
}
DeleteUser.propTypes = {
    userId: PropTypes.string.isRequired,
}
