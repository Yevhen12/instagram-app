import { collection, where, query, getDocs } from "firebase/firestore"
import { db } from "../firebase/firebase"

const useSearch = () => {

    const searchUsers = async (searhStr) => {
        const usersArray = []
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("displayName", ">=", `${searhStr}`), where("displayName", "<=", `${searhStr}` + '~'))
        const docSnap = await getDocs(q)
        docSnap.forEach((doc) => {
            usersArray.push(doc.data())
        })
        return usersArray
    }
    return { searchUsers }
}

export default useSearch