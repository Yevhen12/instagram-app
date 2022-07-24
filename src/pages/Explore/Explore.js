import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import PostsList from "./components/PostsList";
import useSuggestions from "../../hooks/useSuggestions";
import Loading from "../../components/Loaders/Loaging";

const Explore = () => {

    const [allPosts, setAllPosts] = useState([])
    const { fetchUsers } = useSuggestions()
    const POSTS_TO_FETCH = 100

    useEffect(() => {
        const getSuggestions = async () => {
            const users = await fetchUsers(POSTS_TO_FETCH)
            const helpArray = []
            users.forEach(elem => {
                helpArray.push(...elem.posts)
            })

            helpArray.sort(() => 0.5 - Math.random())
            setAllPosts(helpArray)
        }

        getSuggestions()
    }, [])


    // useEffect(() => {
    //     allPosts.forEach(async (elem, idx) => {
    //         const userRef = doc(db, 'users', elem.user.uid)
    //         const userdoc = await getDoc(userRef)

    //         const userData = userdoc.data()
    //         const needPost = userData.posts.find(elemPost => elemPost.uid === elem.uid)
    //         setAllPosts(prevPosts => [...prevPosts, prevPosts[idx] = needPost])
    //     })

    // }, [location.pathname])


    return (
        <div className="w-full h-full">
            <Header />
            {
                allPosts.length > 0 ?
                    (
                        <PostsList allPosts={allPosts} />
                    )
                    :
                    (

                        <div className="h-[calc(100vh-65px)]">
                            <Loading width={50} height={50} />
                        </div>
                    )
            }

        </div>

    )
}

export default Explore