import React from "react";
import { Link } from "react-router-dom";
import convertUnixTime from "../../../helpers/converUnixTime";

const Comment = ({ postComment }) => {

    let currentTimeString = convertUnixTime(postComment.createdAt).split(' ')
    currentTimeString = currentTimeString[1] === 'Now' ? 'Now' : currentTimeString[0] + currentTimeString[1][0]

    console.log(convertUnixTime(new Date('2022-07-11').getTime()))

    return (
        <div className="flex justify-between px-5 mb-5">
            <div className="mr-5">
                <Link to={`/${postComment.userUid}`}>
                    <img alt="userPhoto" src={`${postComment.imageUrl}`} className='w-8 h-8 object-cover rounded-full' />
                </Link>
            </div>
            <div style={{ wordWrap: "break-word" }} className="flex flex-col w-full max-w-[calc(100%-90px)] text-sm ">
                <Link to={`/${postComment.userUid}`}>
                    <p className="text-sm font-semibold">{postComment.displayName}</p>
                </Link>
                <p className="text-sm mb-3">{postComment.text}</p>
                <div className="flex">
                    <p className="text-xs text-black/50 mr-6">{currentTimeString}</p>
                    <p className="text-xs text-black/50">Reply</p>
                </div>
            </div>
            <div className="mt-2 cursor-pointer">
                <img alt="like" src="/images/heart-black-icon.png" className="w-3 h-3" />
            </div>

        </div>
    )
}

export default Comment