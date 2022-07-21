import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ShareMessage = ({message, messages, idx}) => {
    const userRedux = useSelector(state => state.userReducer.user)
    return (
        <div style={{ wordWrap: "break-word" }} className={`bg-black/5 rounded-3xl border mt-2 w-[230px] 
                                        ${message.user.uid === userRedux.uid ? '' : (messages[idx + 1] ? messages[idx + 1].user.uid !== messages[idx].user.uid : true) ? '' : 'ml-9'}`}>
            <div className="p-3 flex items-center">
                <Link to={`/${message.post.currentPost.user.displayName}`}>
                    <img
                        alt="userPhoto"
                        src={`${message.post.currentPost.user.imageUrl ? message.post.currentPost.user.imageUrl : '/images/standart-profile.png'}`}
                        className='w-8 h-8 object-cover mr-3 rounded-full'
                    />
                </Link>
                <Link to={`/${message.post.currentPost.user.displayName}`}>
                    <p className="text-sm">{message.post.currentPost.user.displayName}</p>
                </Link>
            </div>
            <Link to={`/${message.post.currentPost.user.displayName}/${message.post.currentPost.uid}`}>
                <div className={`h-[230px] flex justify-center bg-white ${message.post.text.length > 0 ? '' : 'rounded-b-3xl'}`}>
                    <img alt="somePhoto" src={message.post.currentPost.image} className={`object-cover w-full h-full ${message.post.text.length > 0 ? '' : 'rounded-b-3xl'}`} />
                </div>
            </Link>
            {
                message.post.text.length > 0 &&
                (
                    <div className="flex flex-col px-3 py-2">
                        <p className="text-sm font-semibold">{message.post.currentPost.user.displayName}</p>
                        <p className="text-sm">{message.post.text}</p>
                    </div>
                )
            }
        </div>

    )
}

export default ShareMessage