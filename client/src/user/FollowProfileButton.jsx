import { Button } from '@/components/ui/button'
import React from 'react'
import PropTypes from 'prop-types'
import { unfollow, follow } from './api-user.js'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function FollowProfileButton(props) {
    const followClick = () => {
        props.onButtonClick(follow)
    }
    const unfollowClick = () => {
        props.onButtonClick(unfollow)
    }
    return (
        <div className='flex'>
            {props.following ? (
                <Button
                    className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'ml-30 bg-black text-white w-40',
                    )}
                    onClick={unfollowClick}
                >
                    Unfollow
                </Button>
            ) : (
                <Button
                    onClick={followClick}
                    className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'ml-30 bg-black text-white w-40',
                    )}
                >
                    Follow
                </Button>
            )}
        </div>
    )
}
FollowProfileButton.propTypes = {
    following: PropTypes.bool.isRequired,
    onButtonClick: PropTypes.func.isRequired,
}
