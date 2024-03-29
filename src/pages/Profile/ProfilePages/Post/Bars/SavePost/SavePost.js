import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../../../../../redux/actions/userActions";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../../firebase/firebase";

const SavePost = ({updatedCurrentPost, currentPost}) => {

    const userRedux = useSelector(state => state.userReducer.user)
    const dispatch = useDispatch()

    const [isSaved, setIsSaved] = useState()

    useEffect(() => {
        const getUser = async () => {
            const userRef = doc(db, 'users', userRedux.uid)
            const docUser = await getDoc(userRef)

            const userData = docUser.data()

            dispatch(setUser(userData))

            const isPostSaved = userData.savedPosts.length > 0 && userData.savedPosts.find(elem => elem.uid === currentPost.uid) ? true : false
            setIsSaved(isPostSaved)
        }

        getUser()
    }, [])

    const savePost = async () => {
        setIsSaved(prevIsSaved => !prevIsSaved)

        const userCurrentProfileDoc = doc(db, 'users', userRedux.uid)

        if (isSaved) {
            const filteredPostsSavedArray = userRedux.savedPosts.filter(elem => elem.uid !== updatedCurrentPost.uid)

            await updateDoc(userCurrentProfileDoc, {
                "savedPosts": filteredPostsSavedArray
            })


            dispatch(setUser({ ...userRedux, savedPosts: filteredPostsSavedArray }))
        } else {
            const newSavedPostsArray = [updatedCurrentPost, ...userRedux.savedPosts]

            await updateDoc(userCurrentProfileDoc, {
                "savedPosts": newSavedPostsArray
            })

            dispatch(setUser({ ...userRedux, savedPosts: newSavedPostsArray }))
        }
    }


    return (
        <img
            alt="save"
            src={`${isSaved ? process.env.PUBLIC_URL + '/images/save-post-black-icon.png' : process.env.PUBLIC_URL + '/images/save-icon.png'}`}
            className={`${isSaved ? '' : 'hover:opacity-50'} h-[22px] w-[22px] cursor-pointer`}
            onClick={savePost}
        />
    )
}

export default React.memo(SavePost)