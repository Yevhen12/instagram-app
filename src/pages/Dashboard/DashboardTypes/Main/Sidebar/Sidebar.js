import React, { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import useSuggestions from '../../../../../hooks/useSuggestions'
import UserSuggestion from './UserSuggestion'
import UserSkeleton from './UserSkeleton'
import { useNavigate } from 'react-router-dom'
import 'react-loading-skeleton/dist/skeleton.css'

const Sidebar = () => {
    const { fetchUsers } = useSuggestions()
    const [suggestions, setSuggestions] = useState([])
    const userRedux = useSelector(state => state.userReducer.user)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const USERS_TO_FETCH = 5

    useEffect(() => {
        setIsLoading(true)
        const getSuggestions = async () => {
            const users = await fetchUsers(USERS_TO_FETCH)
            setSuggestions(users)
            setIsLoading(false)
        }

        getSuggestions()
    }, [])

    const skeletonUsers = Array(USERS_TO_FETCH).fill(0).map((_, idx) => <UserSkeleton key={idx} />)

    const mappedSuggestions = useMemo(() => suggestions.map(elem => <UserSuggestion key={elem.uid} {...elem} />), [suggestions])


    return (
        <aside className='max-w-[330px] w-full mt-5'>
            <div className='w-full'>
                <div className='w-full flex justify-between items-center'>
                    <div className='rounded-full min-w-[56px] mr-4 overflow-hidden'>
                        <img alt='userPhoto' src={`${userRedux.imageUrl ? userRedux.imageUrl : process.env.PUBLIC_URL + '/images/standart-profile.png'}`} className='h-[56px] w-[56px] object-cover' />
                    </div>
                    <div className='flex flex-col w-full'>
                        <p className='font-semibold text-sm'>{userRedux.displayName}</p>
                        <p className='text-sm text-gray-500/70'>{userRedux.name}</p>
                    </div>
                    <button type='button' className='text-xs font-semibold text-[#0195f6]'>
                        Switch
                    </button>
                </div>
                <div className='flex justify-between mt-4'>
                    <p className='text-gray-500 font-semibold text-sm '>Suggestions For You</p>
                    <button className='text-xs' type='button' onClick={() => navigate('/people')}>See All</button>
                </div>
                <div className='flex flex-col mt-3'>
                    {isLoading ? skeletonUsers : mappedSuggestions}
                </div>
                <p className='text-gray-500/70 text-xs mt-5'>© 2022 INSTAGRAN FROM META</p>
            </div>
        </aside>
    )
}

export default React.memo(Sidebar)