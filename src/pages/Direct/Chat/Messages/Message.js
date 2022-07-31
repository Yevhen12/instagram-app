import React from "react";
import { useSelector } from "react-redux";
import ImageMessage from "./MessagesTypes/ImageMessage";
import TypicalMessage from "./MessagesTypes/TypicalMessage";
import ShareMessage from "./MessagesTypes/ShareMessage";
import HeartMessage from "./MessagesTypes/HeartMessage";
import { Link } from "react-router-dom";

const Message = ({ message, messages, idx }) => {
    const userRedux = useSelector(state => state.userReducer.user)

    const isLast = (message.user.uid !== userRedux.uid && (messages[idx + 1] ? messages[idx + 1].user.uid !== messages[idx].user.uid : true))
    return (
        <li key={message.uniqKey_time} className={`flex items-end ${message.user.uid === userRedux.uid ? 'justify-end' : 'justify-start'}`}>
            {
               isLast &&
                (
                    <div className="rounded-full overflow-hidden w-6 h-6 mr-3 mb-1">
                        <Link to={`/${message.user.displayName}`}>
                            <img className="w-6 h-6" alt="userPhoto" src={`${message.user.imageUrl ? message.user.imageUrl : process.env.PUBLIC_URL + '/images/standart-profile.png'}`} />
                        </Link>
                    </div>
                )
            }

            {message.type === 'image' && <ImageMessage message={message} messages={messages} idx={idx} />}
            {message.type === 'typical' && <TypicalMessage message={message} messages={messages} idx={idx} />}
            {message.type === 'sharing' && <ShareMessage message={message} messages={messages} idx={idx} />}
            {message.type === 'heart' && <HeartMessage message={message} messages={messages} idx={idx} />}

        </li>
    )
}

export default React.memo(Message)