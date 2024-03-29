import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import convertUnixTime from "../../../../../helpers/converUnixTime";
import LikesModal from "../Modals/LikesModal";
import LikeComment from "./LikeComment";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../../firebase/firebase";

const Comment = ({ postComment, updatedCurrentPost, setUpdatedCurrentPost }) => {

    const [activeModal, setActiveModal] = useState(false)
    const [newUser, setNewUser] = useState()

    useEffect(() => {

        const getUser = async () => {
            const newCommentUser = doc(db, 'users', postComment.userUid)
            const newUserSnap = await getDoc(newCommentUser);

            setNewUser(newUserSnap.data())
        }

        getUser()

    }, [updatedCurrentPost])

    let currentTimeString = convertUnixTime(postComment.createdAt).split(' ')
    currentTimeString = currentTimeString[1] === 'Now' ? 'Now' : currentTimeString[0] + currentTimeString[1][0]

    return (
        <div className="flex justify-between px-5 mb-5">
            <div className="mr-5">
                <Link to={`/${postComment.displayName}`}>
                    <img alt="userPhoto" src={`${newUser && newUser.imageUrl ? newUser.imageUrl : process.env.PUBLIC_URL + '/images/standart-profile.png'}`} className='w-8 h-8 object-cover rounded-full' />
                </Link>
            </div>
            <div style={{ wordWrap: "break-word" }} className="flex flex-col w-full max-w-[calc(100%-90px)] text-sm ">
                <Link to={`/${postComment.displayName}`}>
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
            <LikeComment
                updatedCurrentPost={updatedCurrentPost}
                setUpdatedCurrentPost={setUpdatedCurrentPost}
                postComment={postComment}
            />

        </div>
    )
}

export default React.memo(Comment)