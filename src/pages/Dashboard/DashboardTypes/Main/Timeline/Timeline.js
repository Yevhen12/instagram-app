import React, { useState, useEffect, useContext } from 'react'
import { useSelector } from 'react-redux'
import { Context } from '../../../../../context/firebaseContext'
import Post from './Posts/Post'

const Timeline = () => {

    const userRedux = useSelector(state => state.userReducer.user)
    const {doc, db, getDoc} = useContext(Context)
    const [allPosts, setAllPosts] = useState([])
    
    useEffect(() => {

        const getAllPosts = () => {
            userRedux.following.forEach(async (user) => {
                const docUser = doc(db, "users", user.uid);
                const docSnap = await getDoc(docUser);
                const followingUser = docSnap.data()
                setAllPosts(prevAllPosts => [...prevAllPosts, ...followingUser.posts])
            });
        }

        getAllPosts()

    }, [])

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