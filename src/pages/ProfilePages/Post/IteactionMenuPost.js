import React, { useState, useRef, useContext } from "react";
import converUnixTime from '../../../helpers/converUnixTime'
import { Context } from "../../../context/firebaseContext";
import { setCurrentProfileUser } from "../../../redux/actions/currentProfileUser";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../../redux/actions/userActions";

const IteractionMenuPost = ({ currentPost }) => {

    const currentUserInProfile = useSelector(state => state.currentProfileUserReducer.user)
    const userRedux = useSelector(state => state.userReducer.user)

    const { doc, db, updateDoc } = useContext(Context)

    const [textComment, setTextComment] = useState('')

    const some = currentPost.likes.length > 0 && currentPost.likes.find(elem => elem.uid === userRedux.uid) ? true : false
    const [isLiked, setIsLiked] = useState(some)
    const [likeAnimation, setLikeAnimation] = useState(false)

    const commentRef = useRef(null)
    const postTime = converUnixTime(currentPost.uid)

    const dispatch = useDispatch()


    const likePost = async () => {

        const { imageUrl, displayName, uid } = userRedux
        const userCurrentProfileDoc = doc(db, 'users', currentUserInProfile.uid)
        let newProfileUser;

        setIsLiked(prevIsLiked => !prevIsLiked)
        setLikeAnimation(true)

        if (isLiked) {
            const filteredLikeArray = currentPost.likes.filter(elem => elem.uid !== uid)
            const mapPostsArray = currentUserInProfile.posts.map(elem => {
                if (elem.uid === currentPost.uid) {
                    return {
                        ...elem,
                        likes: filteredLikeArray
                    }
                } else return elem
            })

            await updateDoc(userCurrentProfileDoc, {
                "posts": mapPostsArray
            })

            newProfileUser = {
                ...currentUserInProfile,
                posts: mapPostsArray
            }

        } else {
            const newArrayLikes = [...currentPost.likes, { imageUrl, displayName, uid }]
            const mapPostsArray = currentUserInProfile.posts.map(elem => {
                if (elem.uid === currentPost.uid) {
                    return {
                        ...elem,
                        likes: newArrayLikes
                    }
                } else return elem
            })

            await updateDoc(userCurrentProfileDoc, {
                "posts": mapPostsArray
            })

            newProfileUser = {
                ...currentUserInProfile,
                posts: mapPostsArray
            }
        }

        dispatch(setCurrentProfileUser(newProfileUser))

        if (currentUserInProfile.uid === userRedux.uid) {
            dispatch(setUser(newProfileUser))
        }
    }

    const commentPost = async () => {

        const { imageUrl, displayName, uid } = userRedux
        const userCurrentProfileDoc = doc(db, 'users', currentUserInProfile.uid)

        const newComment = {
            imageUrl,
            displayName,
            userUid: uid,
            text: textComment,
            likes: [],
            createdAt: new Date().getTime().toString()
        }

        const newArrayComments = [newComment, ...currentPost.comments, ]
        const mapPostsArray = currentUserInProfile.posts.map(elem => {
            if (elem.uid === currentPost.uid) {
                return {
                    ...elem,
                    comments: newArrayComments
                }
            } else return elem
        })

        await updateDoc(userCurrentProfileDoc, {
            "posts": mapPostsArray
        })

        dispatch(setCurrentProfileUser({...currentUserInProfile, posts: mapPostsArray}))

        if (currentUserInProfile.uid === userRedux.uid) {
            dispatch(setUser({...userRedux, posts: mapPostsArray}))
        }

        setTextComment('')

    }

    console.log(likeAnimation)


    return (
        <div className="flex flex-col">
            <div className="p-4 border-b">
                <div className="flex justify-between mb-4">
                    <div className="flex items-center">
                        <img
                            alt="heart"
                            src={`${isLiked ? '/images/heart-red-icon.png' : '/images/heart-black-icon.png'}`}
                            className={`h-6 w-6 mr-5 cursor-pointer ${isLiked ? '' : 'hover:opacity-50'} ${(likeAnimation && isLiked) && 'animate-[likeAnim_0.25s_ease-in-out_1]'}`} 
                            onClick={() => likePost()}
                            onAnimationEnd = {() => setLikeAnimation(false)}
                        />

                        <img alt="comment" src="/images/comment-icon.png" className="h-[22px] w-[22px] mr-5 cursor-pointer hover:opacity-50" onClick={() => commentRef.current.focus()} />
                        <img alt="send" src="/images/send-message-icon.png" className="h-5 w-5 cursor-pointer hover:opacity-50" />
                    </div>
                    <div>
                        <img alt="save" src="/images/save-icon.png" className="h-5 w-5 cursor-pointer hover:opacity-50" />
                    </div>
                </div>
                {
                    currentPost.likes.length > 0 ?
                        (
                            <p className="font-semibold text-sm">{currentPost.likes.length} like</p>
                        )
                        :
                        (
                            <p className="text-sm">Be the first to <span className="font-semibold text-sm">like this</span></p>
                        )
                }
                <p className="text-[10px] mt-2 text-black/60">{postTime.toUpperCase()} AGO</p>
            </div>
            <div className="flex flex-row px-4 min-h-[50px] max-h-[100px] w-full items-center">
                <img alt="smile" src="/images/smile-icon.png" className="w-5 h-5 cursor-pointer" />
                <input
                    value={textComment}
                    onChange={(e) => setTextComment(e.target.value)}
                    ref={commentRef}
                    type='text'
                    placeholder="Add a comment..."
                    className="placeholder:text-sm outline-none overflow h-[19px] w-full px-3 text-sm" />
                <button type="button" className="text-[#0195f6] font-semibold text-sm" onClick={() => commentPost()}>Post</button>
            </div>
        </div>
    )
}

export default IteractionMenuPost