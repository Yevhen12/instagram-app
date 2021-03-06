import React, { useContext, useEffect } from "react";
import Header from "../../components/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Context } from "../../context/firebaseContext";
import { setCurrentProfileUser } from "../../redux/actions/currentProfileUser";
import RealUser from "./ProfilePages/RealUser";
import StrangeProfileUser from './ProfilePages/StrangeProfileUser'

const Profile = () => {

    const { where, query, collection, db, getDocs } = useContext(Context)
    const { user } = useParams()
    const userRedux = useSelector((state) => state.userReducer.user)
    const currentProfileUser = useSelector((state) => state.currentProfileUserReducer.user)
    const dispatch = useDispatch()


    useEffect(() => {
        const getCurrentUser = async () => {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("displayName", "==", `${user}`))
            console.log(user)
            const docSnap = await getDocs(q)
            docSnap.forEach((doc) => {
                dispatch(setCurrentProfileUser(doc.data()));
            })
        }
        getCurrentUser()
    }, [user])


    const isUserOnStrangeProfile = userRedux.uid !== currentProfileUser.uid

    return (
        <>
            <Header />
            {isUserOnStrangeProfile ?
                <StrangeProfileUser /> :
                <RealUser />
            }

        </>
    )
}

export default React.memo(Profile)