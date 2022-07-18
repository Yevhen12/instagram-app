import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Context } from "../../context/firebaseContext";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Suggestions from "../../components/Suggestions/Suggestions";
import * as ROUTES from '../../constants/pagesLinks'

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


    console.log(allPosts)

    return (
        <div className="bg-[#fafafa]">
            {!auth.currentUser && <Navigate to={ROUTES.SIGN_IN} />}
            <Header />
            <Suggestions />
        </div>
    )
}

export default Dashboard