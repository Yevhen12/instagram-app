import { useContext } from "react"
import { Context } from "../context/firebaseContext"

const useSearch = () => {
    const { collection, db, where, query, getDocs } = useContext(Context)

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