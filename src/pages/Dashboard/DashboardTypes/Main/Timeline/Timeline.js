import React, { useState, useEffect, useContext } from 'react'
import { useSelector } from 'react-redux'
import { Context } from '../../../../../context/firebaseContext'
import Post from './Posts/Post'
import { useLocation } from 'react-router-dom'

const Timeline = () => {

    const userRedux = useSelector(state => state.userReducer.user)
    const {doc, db, getDoc} = useContext(Context)
    const [allPosts, setAllPosts] = useState([])

    const location = useLocation()
    
    useEffect(() => {

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

        console.log(1)

        getAllPosts()

    }, [location.pathname])

    const mapedAllPosts = allPosts.map(elem => <Post key={elem.uid} post={elem} />)


    return (
        <section className='max-w-[470px] w-full mr-10'>
            <div className='w-full'>
                <ul className='flex flex-col'>
                    {mapedAllPosts}
                </ul>
            </div>
        </section>
    )
}

export default Timeline