import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../../../../redux/actions/userActions";
import { setCurrentProfileUser } from "../../../../../redux/actions/currentProfileUser";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../firebase/firebase";

const LikeComment = ({updatedCurrentPost, postComment, setUpdatedCurrentPost}) => {

    const userRedux = useSelector(state => state.userReducer.user)
    const currentUserInProfile = useSelector(state => state.currentProfileUserReducer.user)

    const isCommentLiked = postComment.likes.length > 0 && postComment.likes.find(elem => elem.uid === userRedux.uid) ? true : false

    const [isLiked, setIsLiked] = useState(isCommentLiked)
    const [likeAnimation, setLikeAnimation] = useState(false)
    const dispatch = useDispatch()

    const likeComment = async () => {

        const { imageUrl, displayName, uid } = userRedux

        const userCurrentProfileDoc = doc(db, 'users', updatedCurrentPost.user.uid)
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

                    setUpdatedCurrentPost(prevPost => ({ ...prevPost, comments: mapedComments }))

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

                    setUpdatedCurrentPost(prevPost => ({ ...prevPost, comments: mapedComments }))

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

        if (userToUpdate.uid === currentUserInProfile.uid) {
            dispatch(setCurrentProfileUser(newProfileUser))
        }


        if (userToUpdate.uid === userRedux.uid) {
            dispatch(setUser(newProfileUser))
        }
    }


    return (
        <div className="mt-2 cursor-pointer">
            <img
                alt="like"
                src={process.env.PUBLIC_URL + `/images/heart-${isLiked ? 'red' : 'black'}-icon.png`}
                className={`w-3 h-3 ${(likeAnimation && isLiked) && 'animate-[likeAnim_0.25s_ease-in-out_1]'}`}
                onClick={() => likeComment()}
                onAnimationEnd={() => setLikeAnimation(false)}
            />
        </div>
    )
}

export default React.memo(LikeComment)