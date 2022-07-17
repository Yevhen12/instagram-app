import React from "react";
import { useSelector } from "react-redux";

const ImageMessage = ({ message, messages, idx }) => {
    const userRedux = useSelector(state => state.userReducer.user)
    return (
        <div style={{ wordWrap: "break-word" }} className={`mt-2 rounded-3xl max-w-[230px] ${message.images.userImage && 'w-full object-cover'} 
                            ${message.user.uid === userRedux.uid ? '' : (messages[idx + 1] ? messages[idx + 1].user.uid !== messages[idx].user.uid : true) ? '' : 'ml-9'}`}>
            <div className="rounded-3xl border">
                <img alt="somePhoto" src={message.images.userImage} className="rounded-3xl" />
            </div>
        </div>
    )
}

export default ImageMessage