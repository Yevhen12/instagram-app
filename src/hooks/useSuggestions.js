import { useState } from "react"
import { useSelector } from "react-redux"
import { doc, collection, getDocs, getDoc } from "firebase/firestore"
import { db } from "../firebase/firebase"

const useSuggestions = () => {

    const userRedux = useSelector(state => state.userReducer.user)
    const [currentUserInfo, setCurrenUserInfo] = useState()

    const getCurrenUser = async () => {
        const userRef = doc(db, 'users', userRedux.uid)

        const userSnap = await getDoc(userRef)

        setCurrenUserInfo(userSnap.data())
    }

    const fetchUsers = async (usersLength) => {
        await getCurrenUser()
        const usersRef = collection(db, "users");

        const usersSnap = await getDocs(usersRef)
        console.log(usersSnap.docs)
        const arrayAllUsers = usersSnap.docs.map(elem => elem.data())
        const mapedUsersSnap = arrayAllUsers.filter(elem => elem.uid !== userRedux.uid && userRedux.following.every(followUser => followUser.uid !== elem.uid))
            .slice(0, usersLength).sort(() => 0.5 - Math.random())

        return mapedUsersSnap
    }

    return { fetchUsers }
}

export default useSuggestions