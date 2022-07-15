import React, { useState, useRef, useContext, useEffect } from "react";
import converUnixTime from '../../../helpers/converUnixTime'
import { Context } from "../../../context/firebaseContext";
import { setCurrentProfileUser } from "../../../redux/actions/currentProfileUser";
import { setCurrentPost } from "../../../redux/actions/currentPostAction";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../../redux/actions/userActions";
import LikesModal from "./LikesModal";
import { useNavigate } from "react-router-dom";
import ModalSharePost from "./ModalSharePost";

const IteractionMenuPost = ({ currentPost, isCurrentPostSaved }) => {

    const currentUserInProfile = useSelector(state => state.currentProfileUserReducer.user)
    const userRedux = useSelector(state => state.userReducer.user)
    const currentPostRedux = useSelector(state => state.currentPostReducer.post)

    const { doc, db, updateDoc, getDoc } = useContext(Context)

    const [textComment, setTextComment] = useState('')

    const isPostLiked = currentPostRedux.likes && currentPostRedux.likes.find(elem => elem.uid === userRedux.uid) ? true : false
    const isPostSaved = userRedux.savedPosts.length > 0 && userRedux.savedPosts.find(elem => elem.uid === currentPost.uid) ? true : false

    const [isLiked, setIsLiked] = useState(isPostLiked)
    const [isSaved, setIsSaved] = useState(isPostSaved)
    const [likeAnimation, setLikeAnimation] = useState(false)
    const [activeModal, setActiveModal] = useState(false)
    const [activeSharePost, setActiveSharePost] = useState(false)

    useEffect(() => {
        setIsLiked(currentPostRedux.likes && currentPostRedux.likes.find(elem => elem.uid === userRedux.uid) ? true : false)
    }, [currentPostRedux])

    const navigate = useNavigate()

    const commentRef = useRef(null)
    let postTime = converUnixTime(currentPost.uid).split(' ')


    if (Number(postTime[0]) == 1) {
        postTime[1] = postTime[1].split('').slice(0, -1).join('')
        postTime = postTime.join(' ')
    } else {
        postTime = postTime.join(' ')
    }

    console.log(postTime)

    const dispatch = useDispatch()


    const likePost = async () => {

        const { imageUrl, displayName, uid } = userRedux
        const userCurrentProfileDoc = doc(db, 'users', currentPost.user.uid)
        const userSnap = await getDoc(userCurrentProfileDoc);

        const userToUpdate = userSnap.data()

        let newProfileUser;

        setIsLiked(prevIsLiked => !prevIsLiked)
        setLikeAnimation(true)

        console.log(userToUpdate)

        if (isLiked) {
            const filteredLikeArray = currentPostRedux.likes.filter(elem => elem.uid !== uid)
            const mapPostsArray = userToUpdate.posts.map(elem => {
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

            dispatch(setCurrentPost({ ...currentPostRedux, likes: filteredLikeArray }))

            newProfileUser = {
                ...userToUpdate,
                posts: mapPostsArray
            }

        } else {
            const newArrayLikes = [{ imageUrl, displayName, uid }, ...currentPostRedux.likes]
            const mapPostsArray = userToUpdate.posts.map(elem => {
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

            dispatch(setCurrentPost({ ...currentPostRedux, likes: newArrayLikes }))

            newProfileUser = {
                ...currentUserInProfile,
                posts: mapPostsArray
            }


        }
        if (userToUpdate.uid === currentUserInProfile.uid) {
            dispatch(setCurrentProfileUser(newProfileUser))
        }


        if (userToUpdate.uid === userRedux.uid) {
            dispatch(setUser(newProfileUser))
        }
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
            console.log(1)
            dispatch(setCurrentProfileUser({ ...currentUserInProfile, posts: mapPostsArray }))
        }


        if (userToUpdate.uid === userRedux.uid) {
            console.log(2)
            dispatch(setUser({ ...userRedux, posts: mapPostsArray }))
        }

        if (isCurrentPostSaved) {
            console.log(1)
            const mapSavedArrayPosts = userRedux.savedPosts.map(elem => {
                if (elem.uid === currentPost.uid) {
                    return {
                        ...elem,
                        comments: newArrayComments
                    }
                } else return elem
            })
            console.log(mapSavedArrayPosts)

            dispatch(setUser({ ...userRedux, savedPosts: mapSavedArrayPosts }))

            dispatch(setCurrentProfileUser({ ...currentUserInProfile, savedPosts: mapSavedArrayPosts }))
        }

        setTextComment('')

    }

    const savePost = async () => {
        setIsSaved(prevIsSaved => !prevIsSaved)

        const userCurrentProfileDoc = doc(db, 'users', userRedux.uid)

        if (isSaved) {
            const filteredPostsSavedArray = userRedux.savedPosts.filter(elem => elem.uid !== currentPost.uid)

            await updateDoc(userCurrentProfileDoc, {
                "savedPosts": filteredPostsSavedArray
            })


            dispatch(setUser({ ...userRedux, savedPosts: filteredPostsSavedArray }))
        } else {
            const newSavedPostsArray = [currentPost, ...userRedux.savedPosts]

            await updateDoc(userCurrentProfileDoc, {
                "savedPosts": newSavedPostsArray
            })

            dispatch(setUser({ ...userRedux, savedPosts: newSavedPostsArray }))
        }
    }

    console.log(currentPostRedux)



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
                            onAnimationEnd={() => setLikeAnimation(false)}
                        />

                        <img alt="comment" src="/images/comment-icon.png" className="h-[22px] w-[22px] mr-5 cursor-pointer hover:opacity-50" onClick={() => commentRef.current.focus()} />
                        <img alt="send" src="/images/send-message-icon.png" className="h-[22px] w-[22px] cursor-pointer hover:opacity-50" onClick={() => setActiveSharePost(true)} />
                        <ModalSharePost
                            activeModal={activeSharePost}
                            setActiveModal={setActiveSharePost}
                        />

                    </div>
                    <div>
                        <img alt="save" src={`${isSaved ? '/images/save-post-black-icon.png' : '/images/save-icon.png'}`} className={`${isSaved ? '' : 'hover:opacity-50'} h-[22px] w-[22px] cursor-pointer`} onClick={savePost} />
                    </div>
                </div>
                {
                    currentPostRedux.likes && currentPostRedux.likes.length > 0 ?
                        (
                            <>
                                <p type="button" className="font-semibold text-sm border-none m-0 p-0 cursor-pointer" onClick={() => setActiveModal(true)}>{currentPostRedux.likes && currentPostRedux.likes.length} like</p>
                                <LikesModal
                                    activeModal={activeModal}
                                    setActiveModal={setActiveModal}
                                    likes={currentPostRedux.likes && currentPostRedux.likes}
                                />
                            </>
                        )
                        :
                        (
                            <p className="text-sm">Be the first to <span className="font-semibold text-sm">like this</span></p>
                        )
                }
                <p className="text-[10px] mt-2 text-black/60">{postTime.toUpperCase()} {postTime.toLowerCase() === ' now' ? '' : ' AGO'}</p>
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
                <button type="button" className={` font-semibold text-sm ${textComment.length > 0 ? 'text-[#0195f6]' : 'text-[#0195f6]/40'}`} disabled={!textComment.length} onClick={() => commentPost()}>Post</button>
            </div>
        </div>
    )
}

export default IteractionMenuPost