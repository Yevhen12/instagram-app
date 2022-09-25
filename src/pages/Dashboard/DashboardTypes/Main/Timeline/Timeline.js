import React, { useState, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import Post from './Posts/Post'
import { Outlet } from 'react-router-dom'
import Loading from '../../../../../components/Loaders/Loaging'
import { db } from '../../../../../firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'

const Timeline = () => {

    const userRedux = useSelector(state => state.userReducer.user)
    const [allPosts, setAllPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const wrapper = async () => {
            setIsLoading(true)
            const getAllPosts = async () => {
                const refUser = doc(db, 'users', userRedux.uid)
                const docUser = await getDoc(refUser)

                const userData = docUser.data()
                userData.following.forEach(async (user) => {
                    const docUserFollowing = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docUserFollowing);
                    const followingUser = docSnap.data()

                    setAllPosts(prevAllPosts => [...prevAllPosts, ...followingUser.posts])
                });
            }
            await getAllPosts()
            setIsLoading(false)
        }

        wrapper()


    }, [])

    const mapedAllPosts = useMemo(() => allPosts.sort((a, b) => b.uid - a.uid).map(elem => <Post key={elem.uid} post={elem} />), [allPosts])


    return (
        <>
            {
                isLoading ?
                    (
                        <div className='w-[470px] mr-10 h-full flex items-center justify-center h-[calc(100vh-65px)]'>
                            <Loading height={70} width={70} />
                        </div>
                    )
                    :
                    (
                        <section className='max-w-[470px] w-full md:mr-10'>
                            <div className='w-full'>
                                <ul className='flex flex-col'>
                                    {mapedAllPosts}
                                    <Outlet context={{ posts: allPosts }} />
                                </ul>
                            </div>
                        </section>
                    )

            }
        </>

    )
}

export default React.memo(Timeline)