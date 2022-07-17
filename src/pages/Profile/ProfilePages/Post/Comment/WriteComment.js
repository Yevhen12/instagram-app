import React, {useContext} from "react";
import EmojiModal from "../../../../../components/EmojiModal/EmojiModal";
import { useSelector, useDispatch } from "react-redux";
import { Context } from "../../../../../context/firebaseContext";
import { setCurrentPost } from "../../../../../redux/actions/currentPostAction";
import { setUser } from "../../../../../redux/actions/userActions";
import { setCurrentProfileUser } from "../../../../../redux/actions/currentProfileUser";

const WriteComment = ({textComment, setTextComment, commentRef, setShowPicker, showPicker, currentPostRedux, isCurrentPostSaved }) => {

    const userRedux = useSelector(state => state.userReducer.user)
    const currentUserInProfile = useSelector(state => state.currentProfileUserReducer.user)
    const dispatch = useDispatch()
    const {doc, db, getDoc, updateDoc} = useContext(Context)

    const pickerStyle = {
        width: '310px',
        position: "absolute",
        top: '-330px',
        left: '0px',
        zIndex: '21'
    }

    const commentPost = async () => {

        const { imageUrl, displayName, uid } = userRedux
        const userCurrentProfileDoc = doc(db, 'users', currentPostRedux.user.uid)
        const userSnap = await getDoc(userCurrentProfileDoc);

        const userToUpdate = userSnap.data()

        const newComment = {
            imageUrl,
            displayName,
            userUid: uid,
            text: textComment,
            likes: [],
            createdAt: new Date().getTime().toString(),
            parent: currentPostRedux.uid
        }

        const newArrayComments = [newComment, ...currentPostRedux.comments,]
        const mapPostsArray = userToUpdate.posts.map(elem => {
            if (elem.uid === currentPostRedux.uid) {
                return {
                    ...elem,
                    comments: newArrayComments
                }
            } else return elem
        })

        await updateDoc(userCurrentProfileDoc, {
            "posts": mapPostsArray
        })

        dispatch(setCurrentPost({ ...currentPostRedux, comments: newArrayComments }))


        if (userToUpdate.uid === currentUserInProfile.uid) {
            dispatch(setCurrentProfileUser({ ...currentUserInProfile, posts: mapPostsArray }))
        }


        if (userToUpdate.uid === userRedux.uid) {
            dispatch(setUser({ ...userRedux, posts: mapPostsArray }))
        }

        if (isCurrentPostSaved) {
            const mapSavedArrayPosts = userRedux.savedPosts.map(elem => {
                if (elem.uid === currentPostRedux.uid) {
                    return {
                        ...elem,
                        comments: newArrayComments
                    }
                } else return elem
            })

            dispatch(setUser({ ...userRedux, savedPosts: mapSavedArrayPosts }))

            dispatch(setCurrentProfileUser({ ...currentUserInProfile, savedPosts: mapSavedArrayPosts }))
        }

        setTextComment('')

    }


    return (
        <div className="flex flex-row px-4 min-h-[50px] max-h-[100px] w-full items-center relative">
                <img alt="smile" src="/images/smile-icon.png" className="w-5 h-5 cursor-pointer" onClick={() => setShowPicker(prevShowPicker => !prevShowPicker)} />
                <input
                    value={textComment}
                    onChange={(e) => setTextComment(e.target.value)}
                    ref={commentRef}
                    type='text'
                    placeholder="Add a comment..."
                    className="placeholder:text-sm outline-none overflow h-[19px] w-full px-3 text-sm"
                />
                <button
                    type="button"
                    className={` font-semibold text-sm ${textComment.length > 0 ? 'text-[#0195f6]' : 'text-[#0195f6]/40'}`}
                    disabled={!textComment.length}
                    onClick={() => commentPost()}>
                    Post
                </button>
                <EmojiModal
                    showPicker={showPicker}
                    setShowPicker={setShowPicker}
                    pickerStyle={pickerStyle}
                    setText={setTextComment}
                />
            </div>
    )
}

export default WriteComment