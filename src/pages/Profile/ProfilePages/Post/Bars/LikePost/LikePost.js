import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../../../../../redux/actions/userActions";
import { setCurrentProfileUser } from "../../../../../../redux/actions/currentProfileUser";
import { createUnixTime } from "../../../../../../helpers/createUnixTime";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../../firebase/firebase";

const LikePost = ({ updatedCurrentPost, setUpdatedCurrentPost }) => {

    const userRedux = useSelector(state => state.userReducer.user)
    const currentUserInProfile = useSelector(state => state.currentProfileUserReducer.user)

    const isPostLiked = updatedCurrentPost.likes && updatedCurrentPost.likes.find(elem => elem.uid === userRedux.uid) ? true : false

    const [isLiked, setIsLiked] = useState(isPostLiked)
    const [likeAnimation, setLikeAnimation] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        setIsLiked(updatedCurrentPost.likes && updatedCurrentPost.likes.find(elem => elem.uid === userRedux.uid) ? true : false)
    }, [updatedCurrentPost])


    const likePost = async () => {

        const { imageUrl, displayName, uid } = userRedux
        const userCurrentProfileDoc = doc(db, 'users', updatedCurrentPost.user.uid)
        const userSnap = await getDoc(userCurrentProfileDoc);

        const userToUpdate = userSnap.data()

        let newProfileUser;

        setIsLiked(prevIsLiked => !prevIsLiked)
        setLikeAnimation(true)



        if (isLiked) {
            const filteredLikeArray = updatedCurrentPost.likes.filter(elem => elem.uid !== uid)
            const mapPostsArray = userToUpdate.posts.map(elem => {
                if (elem.uid === updatedCurrentPost.uid) {
                    return {
                        ...elem,
                        likes: filteredLikeArray
                    }
                } else return elem
            })

            await updateDoc(userCurrentProfileDoc, {
                "posts": mapPostsArray
            })

            setUpdatedCurrentPost(prevPost => ({ ...prevPost, likes: filteredLikeArray }))

            newProfileUser = {
                ...userToUpdate,
                posts: mapPostsArray
            }

        } else {
            const newArrayLikes = [{ imageUrl, displayName, uid, createdAt: createUnixTime() }, ...updatedCurrentPost.likes]
            const mapPostsArray = userToUpdate.posts.map(elem => {
                if (elem.uid === updatedCurrentPost.uid) {
                    return {
                        ...elem,
                        likes: newArrayLikes
                    }
                } else return elem
            })

            await updateDoc(userCurrentProfileDoc, {
                "posts": mapPostsArray
            })

            setUpdatedCurrentPost(prevPost => ({ ...prevPost, likes: newArrayLikes }))

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



    return (
        <img
            alt="heart"
            src={`${isLiked ? process.env.PUBLIC_URL + '/images/heart-red-icon.png' : process.env.PUBLIC_URL + '/images/heart-black-icon.png'}`}
            className={`h-6 w-6 mr-5 cursor-pointer ${isLiked ? '' : 'hover:opacity-50'} ${(likeAnimation && isLiked) && 'animate-[likeAnim_0.25s_ease-in-out_1]'}`}
            onClick={() => likePost()}
            onAnimationEnd={() => setLikeAnimation(false)}
        />
    )
}

export default React.memo(LikePost)