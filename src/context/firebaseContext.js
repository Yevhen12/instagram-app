import React, { createContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { firebase, storage } from '../firebase/firebase'
import { doc, setDoc, getFirestore, getDoc, collection, getDocs, updateDoc, query, where, arrayRemove, arrayUnion } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { useSelector } from "react-redux";

const Context = createContext(null)
const auth = getAuth();
const db = getFirestore(firebase)




const FirebaseContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [firestoreCurrentUser, setFirestoreCurrentUser] = useState(() => JSON.parse(localStorage.getItem('infoCurrentUser')))

    useEffect(() => {
        const unsubsribe = onAuthStateChanged (auth, (currentUser) => {
            if(currentUser) {
                setUser(currentUser)
                const docRef = doc(db, "users", `${auth.currentUser.uid}`);
                getDoc(docRef)
                    .then(data => {
                        if (data.exists()) {
                            const infoCurrentUser = data.data()
                            setFirestoreCurrentUser(infoCurrentUser)
                            localStorage.setItem('infoCurrentUser', JSON.stringify(infoCurrentUser))
                        } else {
                            console.log("No such user")
                        }
                    })
                
            } else {
                localStorage.removeItem('currentUser')
            }
        })

        return unsubsribe
    }, [])


    const isNameAvailable = async (name) => {
        const allUsers = await getDocs(collection(db, "cities"));
        const bool = true
        allUsers.forEach((user) => {
            const nameUser = user.data().displayName
            console.log("This Name" + nameUser + "Another Name")
            if(name == nameUser){
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
              arrayUnion
            }
        }>
            {children}
        </Context.Provider>
    )
}

export {Context, FirebaseContextProvider}