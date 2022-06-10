import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import * as ROUTES from '../constants/links'
import { Context } from "../context/firebaseContext";
import SignUpFirst from "./SignUpPages/SignUpFirst";
import SignUpSecond from "./SignUpPages/SignUpSecond";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/actions/userActions";

const SignUp = () => {

    const [userData, setUserData] = useState({})
    const [page, setPage] = useState(0)
    const [error, setError] = useState()
    const dispatch = useDispatch()
    const { auth, createUserWithEmailAndPassword, doc, setDoc, db, setUser, updateProfile, setFirestoreCurrentUser, firestoreCurrentUser, signOut} = useContext(Context)
    const navigate = useNavigate()


    const func = () => {
        const {email, password} = userData
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            const currentUser = auth.currentUser
            const userRef = doc(db, 'users', currentUser.uid)
            const userObj = {
                ...userData,
                uid: currentUser.uid,
                followers: [],
                following: [],
                posts: [],
            }
            setDoc(userRef, userObj)
            navigate("/sign-in")
        })
        .catch(someError => {
            console.log(someError.message)
            navigate("/sign-up")
            setPage(0)
        })
    }

    return (
        <>
            {page === 0 &&
                <SignUpFirst
                    setUserData={setUserData}
                    setPage={setPage}
                />
            }
            {page === 1 &&
                <SignUpSecond
                    setUserData={setUserData}
                    setPage={setPage}
                />
            }
            {page === 2 &&
                <SignUpFirst
                    setUserData={setUserData}
                    setPage={setPage}
                    userData = {userData}
                /> 
            }
            {page === 3 && func()}
        </>
    )
}

export default SignUp




        // getDocs(collection(db, "users"))
        //     .then(users => {
        //         users.forEach(user => {
        //             const nameOfUser = user.data().displayName
        //             console.log(nameOfUser)
        //             if(name === nameOfUser) {
        //                 setIsNameAvailible(false)
        //                 console.log("This name isnt available")
        //                 setTextForm(
        //                     {
        //                         displayName: '',
        //                         name: '',
        //                         email: '',
        //                         password: ''
        //                     }
        //                 )
        //             }
        //         })
        //         return isNameAvailable
        //     })
        //     .then(data => console.log(data))
        //     .catch(error => console.log(error.message))


        //const boolean = await isNameAvailable(name)
        //console.log(boolean)
        // if(boolean) return
