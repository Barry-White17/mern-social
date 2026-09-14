import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
    Item,
    ItemGroup,
    ItemMedia,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from '@/components/ui/item'
import config from './../../config.js'
import { Card } from '@/components/ui/card'

export default function FollowGrid(props) {
    return (
        <div className='mt-10 mx-15'>
            <ItemGroup>
                {props.people.map((person, i) => {
                    return (
                        <Item>
                            <Link to={'/user/' + person._id}>
                                <div className='flex gap-5 hover:underline'>
                                    <Avatar className='h-12 w-12'>
                                        <AvatarImage
                                            src={`${config.BACKEND_URL}/api/users/photo/${person._id}`}
                                        />
                                        <AvatarFallback className='text-white bg-black text-xl'>
                                            {person.name[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <p className={cn('font-semibold')}>
                                        {person.name}
                                    </p>
                                </div>
                            </Link>
                        </Item>
                    )
                })}
            </ItemGroup>
        </div>
    )
}

FollowGrid.propTypes = {
    people: PropTypes.array.isRequired,
}
