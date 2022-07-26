import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import { Context } from "../../context/firebaseContext";
import SignUpFirst from "./SignUpPages/SignUpFirst";
import SignUpSecond from "./SignUpPages/SignUpSecond";

const SignUp = () => {

    const [userData, setUserData] = useState({})
    const [page, setPage] = useState(0)
    const { auth, createUserWithEmailAndPassword, doc, setDoc, db } = useContext(Context)
    const navigate = useNavigate()


    const signUp = () => {
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
                recentVisitedUsers: [],
                savedPosts: [],
                taggedPosts: [],
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
            {page === 3 && signUp()}
        </>
    )
}

export default React.memo(SignUp)




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
