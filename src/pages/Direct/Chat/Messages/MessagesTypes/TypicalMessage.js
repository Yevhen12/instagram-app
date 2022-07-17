import React from "react";
import { useSelector } from "react-redux";

const TypicalMessage = ({message, messages, idx}) => {
    const userRedux = useSelector(state => state.userReducer.user)
    return (
        <div style={{ wordWrap: "break-word" }} className={`py-2.5 px-4 mt-2 rounded-3xl max-w-[230px] 
        ${message.user.uid === userRedux.uid ? 'bg-black/5' : (messages[idx + 1] ? messages[idx + 1].user.uid !== messages[idx].user.uid : true) ? 'border' : 'border ml-9'}`}>
            <span className="max-w-[230px] text-sm text-ellipsis">
                {message.text}
            </span>
        </div>
    )
}

export default TypicalMessage