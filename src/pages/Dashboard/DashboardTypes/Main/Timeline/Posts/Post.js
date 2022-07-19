import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from '../../../../../../constants/pagesLinks'

const Post = ({ post }) => {
    console.log(post)
    return (
        <div className="flex flex-col max-w-[470px] w-full rounded-md bg-white my-2 border">
            <div className="w-full flex justify-between p-3 items-center">
                <Link to={ROUTES.HOME + post.user.displayName}>
                    <div className="rounded-full h-[32px] min-w-[32px] mr-3">
                        <img alt="userPhoto" src={post.user.imageUrl ? post.user.imageUrl : '/images/standart-profile.png'} className="h-[32px] object-cover" />
                    </div>
                </Link>
                <div className="w-full">
                    <Link to={ROUTES.HOME + post.user.displayName}>
                        <p className="text-sm font-semibold">{post.user?.displayName}</p>
                    </Link>
                </div>
                <button type="button">
                    <img alt="settings" src="/images/option-icon.png" className="h-[18px] " />
                </button>
            </div>
            <div className="w-full min-h-[470px] max-h-[600px] bg-black flex items-center">
                <img className="w-full min-h-[470px] max-h-[600px] object-contain" alt="postPhoto" src={post.image} />
            </div>

            {/* <div className="flex justify-between mb-4">
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
            </div> */}
        </div>
    )

}

export default Post