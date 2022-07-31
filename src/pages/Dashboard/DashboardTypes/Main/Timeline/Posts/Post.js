import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import * as ROUTES from '../../../../../../constants/pagesLinks'
import LikePost from "../../../../../Profile/ProfilePages/Post/Bars/LikePost/LikePost";
import SharePost from "../../../../../Profile/ProfilePages/Post/Bars/SharePost/SharePost";
import SavePost from "../../../../../Profile/ProfilePages/Post/Bars/SavePost/SavePost";
import LikesModal from "../../../../../Profile/ProfilePages/Post/Modals/LikesModal";
import WriteComment from "../../../../../Profile/ProfilePages/Post/Comment/WriteComment";
import convertUnixTime from "../../../../../../helpers/converUnixTime";
import OneComment from "./OneComment";

const Post = ({ post  }) => {
    const [updatedCurrentPost, setUpdatedCurrentPost] = useState(post)
    const [activeModal, setActiveModal] = useState(false)
    const [showPicker, setShowPicker] = useState(false)
    const [textComment, setTextComment] = useState('')
    const [allComments, setAllComments] = useState([])

    const commentRef = useRef(null)
    const location = useLocation()
    const isSavedPostArray = location.pathname.split('/').includes('saved')
    const navigate = useNavigate()

    let postTime = convertUnixTime(post.uid).split(' ')


    if (Number(postTime[0]) == 1) {
        postTime[1] = postTime[1].split('').slice(0, -1).join('')
        postTime = postTime.join(' ')
    } else {
        postTime = postTime.join(' ')
    }

    const pickerStyle = {
        width: '310px',
        position: "absolute",
        top: '-320px',
        left: '-12px',
        zIndex: '21'
    }


    useEffect(() => {
        setAllComments(updatedCurrentPost.comments)
    }, [updatedCurrentPost])

    const navigateToPost = () => {
        navigate(`dashboard/${updatedCurrentPost.user.displayName}/${updatedCurrentPost.uid}`)
    }


    return (
        <div className="flex flex-col max-w-[470px] w-full rounded-md bg-white my-2 border">
            <div className="w-full flex justify-between p-3 items-center">
                <Link to={ROUTES.HOME + post.user.displayName}>
                    <div className="rounded-full h-[32px] w-[32px] mr-3 overflow-hidden">
                        <img alt="userPhoto" src={post.user.imageUrl ? post.user.imageUrl : process.env.PUBLIC_URL + '/images/standart-profile.png'} className="h-[32px] object-cover" />
                    </div>
                </Link>
                <div className="w-full">
                    <Link to={ROUTES.HOME + post.user.displayName}>
                        <p className="text-sm font-semibold">{post.user?.displayName}</p>
                    </Link>
                </div>
                <button type="button">
                    <img alt="settings" src={process.env.PUBLIC_URL + "/images/option-icon.png"} className="h-[18px] " />
                </button>
            </div>
            <div className="w-full min-h-[470px] max-h-[600px] bg-black flex items-center">
                <img className="w-full min-h-[470px] max-h-[600px] object-contain" alt="postPhoto" src={post.image} />
            </div>

            <div className="flex justify-between p-3">
                <div className="flex items-center">
                    <LikePost
                        updatedCurrentPost={updatedCurrentPost}
                        setUpdatedCurrentPost={setUpdatedCurrentPost}
                    />

                    <img alt="comment" src={process.env.PUBLIC_URL + "/images/comment-icon.png"} className="h-[22px] w-[22px] mr-5 cursor-pointer hover:opacity-50" onClick={() => commentRef.current.focus()} />
                    <SharePost
                        updatedCurrentPost={updatedCurrentPost}
                    />

                </div>
                <div>
                    <SavePost
                        updatedCurrentPost={updatedCurrentPost}
                        currentPost={post}
                    />
                </div>
            </div>

            {
                updatedCurrentPost.likes && updatedCurrentPost.likes.length > 0 ?
                    (
                        <>
                            <p type="button" className="font-semibold text-sm border-none m-0 px-3 cursor-pointer" onClick={() => setActiveModal(true)}>{updatedCurrentPost.likes && updatedCurrentPost.likes.length} like</p>
                            <LikesModal
                                activeModal={activeModal}
                                setActiveModal={setActiveModal}
                                likes={updatedCurrentPost.likes && updatedCurrentPost.likes}
                            />
                        </>
                    )
                    :
                    (
                        <p className="text-sm px-3">Be the first to <span className="font-semibold text-sm">like this</span></p>
                    )
            }
            {
                post.text.length > 0 &&
                (
                    <div className="flex flex-row px-3 mt-2">
                        <p className="text-sm font-semibold mr-2 hover:underline">
                            <Link to={`${post.user.displayName}`}>
                                {post.user.displayName}
                            </Link>
                        </p>
                        <p className="text-sm">{post.text}</p>

                    </div>
                )
            }

            {
                allComments.length === 1 && allComments.length !== 0 ?
                    (
                        <OneComment post={updatedCurrentPost && updatedCurrentPost} updatedCurrentPost = {updatedCurrentPost && updatedCurrentPost} setUpdatedCurrentPost = {setUpdatedCurrentPost}/>
                    )
                    :
                    
                    (
                        allComments.length > 1 &&
                        <div className="mt-2">
                            <button type="button" onClick={() => navigateToPost()}>
                                    <p className="text-sm text-gray-500/70 mx-3">View all {updatedCurrentPost.comments.length} comments</p>
                            </button>
                            <OneComment post={updatedCurrentPost && updatedCurrentPost} updatedCurrentPost = {updatedCurrentPost && updatedCurrentPost} setUpdatedCurrentPost = {setUpdatedCurrentPost}/>
                        </div>
                    )
            }
            <p className="text-[10px] mt-2 text-black/60 px-3 mb-3">{postTime.toUpperCase()} {postTime.toLowerCase() === ' now' ? '' : ' AGO'}</p>
            <div className="w-full px-3 border-t">
                <WriteComment
                    textComment={textComment}
                    setTextComment={setTextComment}
                    setShowPicker={setShowPicker}
                    showPicker={showPicker}
                    commentRef={commentRef}
                    updatedCurrentPost={updatedCurrentPost}
                    isCurrentPostSaved={isSavedPostArray ? true : false}
                    setUpdatedCurrentPost={setUpdatedCurrentPost}
                    pickerStyle={pickerStyle}
                />
            </div>
        </div>
    )

}

export default React.memo(Post)