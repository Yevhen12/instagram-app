import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Context } from "../../../context/firebaseContext";
import convertUnixTime from "../../../helpers/converUnixTime";
import { setCurrentProfileUser } from "../../../redux/actions/currentProfileUser";
import { setUser } from "../../../redux/actions/userActions";

const Comment = ({ postComment }) => {

    const dispatch = useDispatch()

    const currentUserInProfile = useSelector(state => state.currentProfileUserReducer.user)
    const userRedux = useSelector(state => state.userReducer.user)

    const { db, doc, updateDoc } = useContext(Context)

    const isCommentLiked = postComment.likes.length > 0 && postComment.likes.find(elem => elem.uid === userRedux.uid) ? true : false

    const [isLiked, setIsLiked] = useState(isCommentLiked)
    const [likeAnimation, setLikeAnimation] = useState(false)


    let currentTimeString = convertUnixTime(postComment.createdAt).split(' ')
    currentTimeString = currentTimeString[1] === 'Now' ? 'Now' : currentTimeString[0] + currentTimeString[1][0]

    const likeComment = async () => {

        const { imageUrl, displayName, uid } = userRedux
        const userCurrentProfileDoc = doc(db, 'users', currentUserInProfile.uid)
        let newProfileUser;

        setIsLiked(prevIsLiked => !prevIsLiked)
        setLikeAnimation(true)

        if (isLiked) {
            const filteredLikeArray = postComment.likes.filter(elem => elem.uid !== uid)
            const mapPostsArray = currentUserInProfile.posts.map(elem => {
                if (elem.uid === postComment.parent) {
                    return {
                        ...elem,
                        comments: elem.comments.map(elemComment => {
                            if (elemComment.createdAt === postComment.createdAt) {
                                return {
                                    ...elemComment,
                                    likes: filteredLikeArray
                                }
                            } else return elemComment
                        })
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
            const newArrayLikes = [{ imageUrl, displayName, uid }, ...postComment.likes]
            const mapPostsArray = currentUserInProfile.posts.map(elem => {
                if (elem.uid === postComment.parent) {
                    console.log(1)
                    return {
                        ...elem, comments: elem.comments.map(elemComment => {
                            if (elemComment.createdAt === postComment.createdAt) {
                                return {
                                    ...elemComment,
                                    likes: newArrayLikes
                                }
                            } else return elemComment
                        })
                    }
                } else return elem
            })

            console.log(mapPostsArray)


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
                            <p className="text-xs text-black/50 mr-4 font-bold">{postComment.likes.length} like</p>
                        )
                    }
                    <p className="text-xs text-black/50">Reply</p>
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