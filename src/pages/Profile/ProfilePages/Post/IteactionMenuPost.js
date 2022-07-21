import React, { useState, useRef, useContext, useEffect } from "react";
import converUnixTime from '../../../../helpers/converUnixTime'
import { Context } from "../../../../context/firebaseContext";
import { useSelector, useDispatch } from "react-redux";
import LikesModal from "./Modals/LikesModal";
import ModalSharePost from './Modals/ModalSharePost'
import WriteComment from "./Comment/WriteComment";
import LikePost from "./Bars/LikePost/LikePost";
import SavePost from "./Bars/SavePost/SavePost";
import SharePost from "./Bars/SharePost/SharePost";
import { setUser } from "../../../../redux/actions/userActions";

const IteractionMenuPost = ({ currentPost, isCurrentPostSaved, updatedCurrentPost, setUpdatedCurrentPost }) => {


    const [textComment, setTextComment] = useState('')

    const [activeModal, setActiveModal] = useState(false)

    const [showPicker, setShowPicker] = useState(false)


    const commentRef = useRef(null)
    let postTime = converUnixTime(currentPost.uid).split(' ')


    if (Number(postTime[0]) == 1) {
        postTime[1] = postTime[1].split('').slice(0, -1).join('')
        postTime = postTime.join(' ')
    } else {
        postTime = postTime.join(' ')
    }

    const pickerStyle = {
        width: '310px',
        position: "absolute",
        top: '-330px',
        left: '0px',
        zIndex: '21'
    }


    return (
        <div className="flex flex-col">
            <div className="p-4 border-b">
                <div className="flex justify-between mb-4">
                    <div className="flex items-center">
                        <LikePost
                            updatedCurrentPost={updatedCurrentPost}
                            setUpdatedCurrentPost={setUpdatedCurrentPost}
                        />
                        <img alt="comment" src="/images/comment-icon.png" className="h-[22px] w-[22px] mr-5 cursor-pointer hover:opacity-50" onClick={() => commentRef.current.focus()} />

                        <SharePost
                            updatedCurrentPost={updatedCurrentPost}
                        />
                    </div>
                    <div>
                        <SavePost
                            updatedCurrentPost={updatedCurrentPost}
                            currentPost={currentPost}
                        />
                    </div>
                </div>
                {
                    updatedCurrentPost.likes && updatedCurrentPost.likes.length > 0 ?
                        (
                            <>
                                <p type="button" className="font-semibold text-sm border-none m-0 p-0 cursor-pointer" onClick={() => setActiveModal(true)}>{updatedCurrentPost.likes && updatedCurrentPost.likes.length} like</p>
                                <LikesModal
                                    activeModal={activeModal}
                                    setActiveModal={setActiveModal}
                                    likes={updatedCurrentPost.likes && updatedCurrentPost.likes}
                                />
                            </>
                        )
                        :
                        (
                            <p className="text-sm">Be the first to <span className="font-semibold text-sm">like this</span></p>
                        )
                }
                <p className="text-[10px] mt-2 text-black/60">{postTime.toUpperCase()} {postTime.toLowerCase() === ' now' ? '' : ' AGO'}</p>
                <WriteComment
                    textComment={textComment}
                    setTextComment={setTextComment}
                    setShowPicker={setShowPicker}
                    showPicker={showPicker}
                    commentRef={commentRef}
                    updatedCurrentPost={updatedCurrentPost}
                    isCurrentPostSaved={isCurrentPostSaved}
                    setUpdatedCurrentPost={setUpdatedCurrentPost}
                    pickerStyle = {pickerStyle}
                />
            </div>

        </div>
    )
}

export default IteractionMenuPost