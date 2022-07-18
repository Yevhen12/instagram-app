import React, { createContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { firebase, storage } from '../firebase/firebase'
import { doc, setDoc, getFirestore, getDoc, collection, getDocs, updateDoc, query, where, arrayRemove, arrayUnion, onSnapshot, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { setUser as setCurruntReduxUser } from "../redux/actions/userActions";
import { setIsLoading } from "../redux/actions/isLoadingAction";

const Context = createContext(null)
const auth = getAuth();
const db = getFirestore(firebase)






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

    console.log(isLoading)


    const isNameAvailable = async (name) => {
        const allUsers = await getDocs(collection(db, "cities"));
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
                auth,
                createUserWithEmailAndPassword,
                doc,
                setDoc,
                db,
                signInWithEmailAndPassword,
                user,
                setUser,
                getDoc,
                setFirestoreCurrentUser,
                firestoreCurrentUser,
                signOut,
                collection,
                getDocs,
                isNameAvailable,
                ref,
                storage,
                uploadBytes,
                getDownloadURL,
                updateDoc,
                deleteObject,
                updateProfile,
                query,
                where,
                arrayRemove,
                arrayUnion,
                onSnapshot,
                deleteDoc,
            }
        }>
            {children}
        </Context.Provider>
    )
}

export { Context, FirebaseContextProvider }