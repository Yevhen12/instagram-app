import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Context } from "../../../context/firebaseContext";
import convertUnixTime from "../../../helpers/converUnixTime";
import { setCurrentProfileUser } from "../../../redux/actions/currentProfileUser";
import { setUser } from "../../../redux/actions/userActions";
import LikesModal from "./LikesModal";
import { setCurrentPost } from "../../../redux/actions/currentPostAction";

const Comment = ({ postComment }) => {

    const dispatch = useDispatch()

    const currentUserInProfile = useSelector(state => state.currentProfileUserReducer.user)
    const userRedux = useSelector(state => state.userReducer.user)
    const currentPostRedux = useSelector(state => state.currentPostReducer.post)

    const { db, doc, updateDoc, getDoc } = useContext(Context)

    const isCommentLiked = postComment.likes.length > 0 && postComment.likes.find(elem => elem.uid === userRedux.uid) ? true : false

    const [isLiked, setIsLiked] = useState(isCommentLiked)
    const [likeAnimation, setLikeAnimation] = useState(false)
    const [activeModal, setActiveModal] = useState(false)


    let currentTimeString = convertUnixTime(postComment.createdAt).split(' ')
    currentTimeString = currentTimeString[1] === 'Now' ? 'Now' : currentTimeString[0] + currentTimeString[1][0]

    const likeComment = async () => {

        const { imageUrl, displayName, uid } = userRedux

        const userCurrentProfileDoc = doc(db, 'users', currentPostRedux.user.uid)
        const userSnap = await getDoc(userCurrentProfileDoc);

        const userToUpdate = userSnap.data()

        let newProfileUser;

        setIsLiked(prevIsLiked => !prevIsLiked)
        setLikeAnimation(true)

        if (isLiked) {
            const filteredLikeArray = postComment.likes.filter(elem => elem.uid !== uid)
            const mapPostsArray = userToUpdate.posts.map(elem => {
                if (elem.uid === postComment.parent) {
                    const mapedComments = elem.comments.map(elemComment => {
                        if (elemComment.createdAt === postComment.createdAt) {
                            return {
                                ...elemComment,
                                likes: filteredLikeArray
                            }
                        } else return elemComment
                    })

                    dispatch(setCurrentPost({...currentPostRedux, comments: mapedComments}))

                    return {
                        ...elem,
                        comments: mapedComments
                    }
                } else return elem
            })


            await updateDoc(userCurrentProfileDoc, {
                "posts": mapPostsArray
            })

            newProfileUser = {
                ...userToUpdate,
                posts: mapPostsArray
            }

        } else {
            const newArrayLikes = [{ imageUrl, displayName, uid }, ...postComment.likes]
            const mapPostsArray = userToUpdate.posts.map(elem => {
                if (elem.uid === postComment.parent) {

                    const mapedComments = elem.comments.map(elemComment => {
                        if (elemComment.createdAt === postComment.createdAt) {
                            return {
                                ...elemComment,
                                likes: newArrayLikes
                            }
                        } else return elemComment
                    })

                    dispatch(setCurrentPost({...currentPostRedux, comments: mapedComments}))

                    return {
                        ...elem, 
                        comments: mapedComments,
                    }
                } else return elem
            })


            await updateDoc(userCurrentProfileDoc, {
                "posts": mapPostsArray
            })

            newProfileUser = {
                ...userToUpdate,
                posts: mapPostsArray
            }
        }

        if(userToUpdate.uid === currentUserInProfile.uid) {
            dispatch(setCurrentProfileUser(newProfileUser))
        }


        if (userToUpdate.uid === userRedux.uid) {
            dispatch(setUser(newProfileUser))
        }
    }

    return (
        <div className="flex justify-between px-5 mb-5">
            <div className="mr-5">
                <Link to={`/${postComment.userUid}`}>
                    <img alt="userPhoto" src={`${postComment?.imageUrl || '/images/standart-profile.png'}`} className='w-8 h-8 object-cover rounded-full' />
                </Link>
            </div>
            <div style={{ wordWrap: "break-word" }} className="flex flex-col w-full max-w-[calc(100%-90px)] text-sm ">
                <Link to={`/${postComment.userUid}`}>
                    <p className="text-sm font-semibold">{postComment.displayName}</p>
                </Link>
                <p className="text-sm mb-3">{postComment.text}</p>
                <div className="flex">
                    <p className="text-xs text-black/50 mr-4">{currentTimeString}</p>
                    {postComment.likes.length > 0 &&
                        (
                            <>
                                <button type="button" className="text-xs text-black/50 mr-4 font-bold" onClick={() => setActiveModal(true)}>{postComment.likes.length} like</button>
                                <LikesModal
                                    activeModal={activeModal}
                                    setActiveModal={setActiveModal}
                                    likes={postComment.likes}
                                />
                            </>
                        )
                    }
                    <button className="text-xs text-black/50">Reply</button>
                </div>
            </div>
            <div className="mt-2 cursor-pointer">
                <img
                    alt="like"
                    src={`/images/heart-${isLiked ? 'red' : 'black'}-icon.png`}
                    className={`w-3 h-3 ${(likeAnimation && isLiked) && 'animate-[likeAnim_0.25s_ease-in-out_1]'}`}
                    onClick={() => likeComment()}
                    onAnimationEnd={() => setLikeAnimation(false)}
                />
            </div>

        </div>
    )
}

export default Comment