import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setCurrentProfileUser } from "../../redux/actions/currentProfileUser";
import RealUser from "./ProfilePages/RealUser";
import StrangeProfileUser from './ProfilePages/StrangeProfileUser'
import NotFound from "../NotFound/NotFound";
import { where, query, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Loading from "../Loading/Loading";

const Profile = () => {

    const { user } = useParams()
    const userRedux = useSelector((state) => state.userReducer.user)
    const currentProfileUser = useSelector((state) => state.currentProfileUserReducer.user)
    const [isLoading, setisLoading] = useState(false)
    const dispatch = useDispatch()


    useEffect(() => {
        setisLoading(true)
        const getCurrentUser = async () => {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("displayName", "==", `${user}`))
            console.log(user)
            const docSnap = await getDocs(q)
            docSnap.forEach((doc) => {
                dispatch(setCurrentProfileUser(doc.data()));
            })
            setisLoading(false)
        }
        getCurrentUser()
        console.log('changed')
    }, [user])


    const isUserOnStrangeProfile = userRedux.uid !== currentProfileUser.uid

    return (
        <>
            {isLoading ? <Loading /> : (

                !isUserOnStrangeProfile && user !== userRedux.displayName ? <NotFound /> :
                    <>
                        <Header />
                        {isUserOnStrangeProfile ? <StrangeProfileUser /> : <RealUser />}
                    </>

            )
            }

        </>
    )
}

export default React.memo(Profile)