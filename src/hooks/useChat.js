import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase/firebase";
import { getDocs, doc, setDoc, collection } from "firebase/firestore";
import { setChats } from "../redux/actions/chatsAction";

const useChat = (chatsArray) => {

    const userRedux = useSelector(state => state.userReducer.user)
    const dispatch = useDispatch()


    const createChat = async (usersArray) => {

        const querySnapshot = await getDocs(collection(db, "chats"));
        const mapQuerySnapshot = querySnapshot.docs.map((doc) => {
            return doc.data()
        });
        const allUsersInArray = [...usersArray, userRedux]
        const namesArrayUser = allUsersInArray.map(elem => elem.displayName)

        const isChatAlreadyExist = mapQuerySnapshot.find(elem => {
            const namesArrayElem = elem.users.map(elem => elem.displayName)
            return JSON.stringify(namesArrayUser.sort()) === JSON.stringify(namesArrayElem.sort())
        })
        if (isChatAlreadyExist) {
            return isChatAlreadyExist.uid
        } else {
            const uniqKey = new Date().getTime().toString();
            await setDoc(doc(db, "chats", `${uniqKey}`), {
                messages: [],
                users: [...usersArray, userRedux],
                uid: uniqKey,
            });
            dispatch(setChats([{ messages: [], users: [...usersArray, userRedux], uid: uniqKey }, ...chatsArray]))


            return uniqKey
        }

    }

    return { createChat }
}

export default useChat