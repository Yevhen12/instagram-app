import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import convertUnixTime from "../../../helpers/converUnixTime";

const UserItem = ({chat, idx}) => {

    const userRedux = useSelector(state => state.userReducer.user)
    const location = useLocation()

    const strangeUser = chat.users.find(elem => elem.uid !== userRedux.uid)
    let currentTimeString = 'Now';
    if (chat.messages.length > 0) {
        currentTimeString = convertUnixTime(chat.messages[chat.messages.length - 1].uniqKey_time).split(' ')
        console.log(currentTimeString[1])
        if(currentTimeString[1] === 'Now') {
            currentTimeString = 'Now'
        } else {
            currentTimeString = currentTimeString[0] + currentTimeString[1][0]
        }
    }

    return (
        <li className={`py-1.5 pl-4 hover:bg-gray-100/50 cursor-pointer ${location.pathname === `/direct/${chat.uid}` && 'bg-black/5 hover:bg-black/5 cursor-default'}`}>
            <Link to={chat.uid} className={`${location.pathname === `/direct/${chat.uid}` && 'cursor-default'}`}>
                <div className="flex justify-left items-center">
                    <div className="w-[3.5rem] h-[3.5rem] rounded-full overflow-hidden mt-1 mr-3">
                        <img
                            className="w-full h-full object-cover"
                            src={`${strangeUser.imageUrl ? strangeUser.imageUrl : process.env.PUBLIC_URL + '/images/standart-profile.png'}`}
                            alt="UserPhoto"
                        />
                    </div>
                    <div className="w-[15.5rem] pr-5">
                        <p className="text-sm">
                            {strangeUser.displayName}
                        </p>
                        <div className="flex">
                            <p className="text-sm text-black/40 max-w-[115px] overflow-hidden mr-1">{chat.messages.length > 0 && chat.messages[chat.messages.length - 1].text} </p>
                            <p className="text-sm text-black/40 min-w-[30px]"> · {currentTimeString}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    )
}

export default React.memo(UserItem)