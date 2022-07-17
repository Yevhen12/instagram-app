import React from "react";
import { useSelector } from "react-redux";

const HeartMessage = ({message, messages, idx}) => {
    const userRedux = useSelector(state => state.userReducer.user)
    return (
        <div style={{ wordWrap: "break-word" }} className={`mt-2 rounded-3xl max-w-[230px] ${message.images.userImage && 'w-full object-cover'} 
                            ${message.user.uid === userRedux.uid ? '' : (messages[idx + 1] ? messages[idx + 1].user.uid !== messages[idx].user.uid : true) ? '' : 'ml-9'}`}>
            <img alt="heart" src={message.images.heart} className="w-12 h-12" />
        </div>
    )
}

export default HeartMessage