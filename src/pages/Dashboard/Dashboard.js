import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Context } from "../../context/firebaseContext";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Suggestion from './DashboardTypes/Suggestion/Suggestion'
import * as ROUTES from '../../constants/pagesLinks'
import Main from "./DashboardTypes/Main/Main";

const Dashboard = () => {

    const [allPosts, setAllPosts] = useState([])
    const { auth, db, doc, getDoc } = useContext(Context)
    const userRedux = useSelector(state => state.userReducer.user)

    useEffect(() => {
        setAllPosts([])
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

    const isSuggestions = allPosts.length === 0


    return (
        <div className="bg-[#fafafa]">
            {!auth.currentUser && <Navigate to={ROUTES.SIGN_IN} />}
            <Header />
            {
            isSuggestions ? 
            (
                <Suggestion />
            )
            :
            (
                <main role="main">
                    <Main />
                </main>
            )
            
}
        </div>
    )
}

export default Dashboard