import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser as setCurruntReduxUser } from "../redux/actions/userActions";
import { setIsLoading } from "../redux/actions/isLoadingAction";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, firebase } from "../firebase/firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";

const Context = createContext(null)

const FirebaseContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [firestoreCurrentUser, setFirestoreCurrentUser] = useState(() => JSON.parse(localStorage.getItem('infoCurrentUser')))
    const isLoading = useSelector(state => state.isLoadingReducer.isLoading)
    const dispatch = useDispatch()

    useEffect(() => {
        const func = async () => {
            dispatch(setIsLoading(true))
            await onAuthStateChanged(auth, async (currentUser) => {
                if (currentUser) {
                    setUser(currentUser)
                    const docRef = doc(db, "users", `${auth.currentUser.uid}`);
                    const docSnap = await getDoc(docRef)
                    setFirestoreCurrentUser(docSnap.data())
                    dispatch(setCurruntReduxUser(docSnap.data()))
                } else {
                    localStorage.removeItem('currentUser')
                }
                dispatch(setIsLoading(false))
            })
           
        }
        func()
    }, [])

    const isNameAvailable = async (name) => {
        const allUsers = await getDocs(collection(db, "users"));
        const bool = true
        allUsers.forEach((user) => {
            const nameUser = user.data().displayName
            console.log("This Name" + nameUser + "Another Name")
            if (name == nameUser) {
                bool = false
                console.log(bool)
            }
        });
        return bool
    }

    return (
        <Context.Provider value={
            {
                firebase,
                user,
                setUser,
                setFirestoreCurrentUser,
                firestoreCurrentUser,
                isNameAvailable
            }
        }>
            {children}
        </Context.Provider>
    )
}

export { Context, FirebaseContextProvider }