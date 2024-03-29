import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Suggestion from './DashboardTypes/Suggestion/Suggestion'
import * as ROUTES from '../../constants/pagesLinks'
import Main from "./DashboardTypes/Main/Main";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";

const Dashboard = () => {

    const [allPosts, setAllPosts] = useState([])
    const userRedux = useSelector(state => state.userReducer.user)
    const [isSuggestions, setIsSuggestions] = useState(false)
    console.log(userRedux)

    useEffect(() => {
        if (auth.currentUser) {
            setAllPosts([])
            const getAllPosts = () => {
                userRedux.following.forEach(async (user) => {
                    const docUser = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docUser);
                    const followingUser = docSnap.data()
                    setAllPosts(prevAllPosts => [...prevAllPosts, ...followingUser.posts])
                });
                if (!userRedux.following.length) setIsSuggestions(true)
            }

            getAllPosts()
        }

    }, [])


    return (
        <div className="bg-[#fafafa]">
            {!auth.currentUser && <Navigate to={ROUTES.SIGN_IN} />}
            <Header />

            {isSuggestions ?
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

export default React.memo(Dashboard)