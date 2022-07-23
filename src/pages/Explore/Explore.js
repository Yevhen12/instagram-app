import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import PostsList from "./components/PostsList";
import { Outlet } from "react-router-dom";
import useSuggestions from "../../hooks/useSuggestions";

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

            console.log(helpArray)

            helpArray.sort(() => 0.5 - Math.random())

            setAllPosts(helpArray)

        }

        console.log('fsdfsdfsddfsdfsdf')

        getSuggestions()
    }, [])


    return (
        <div>
            <Header />
            <PostsList allPosts={allPosts} />
        </div>

    )
}

export default Explore