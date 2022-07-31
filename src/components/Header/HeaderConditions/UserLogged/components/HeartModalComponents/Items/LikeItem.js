import React from "react";
import { Link } from "react-router-dom";
import convertUnixTime from "../../../../../../../helpers/converUnixTime";
import { useSelector } from "react-redux";

const LikeItem = ({ activity }) => {
    const userRedux = useSelector(state => state.userReducer.user)
    let currentTimeString = 'Now';
    currentTimeString = convertUnixTime(activity.createdAt).split(' ')
    if (currentTimeString[1] === 'Now') {
        currentTimeString = 'Now'
    } else {
        currentTimeString = currentTimeString[0] + currentTimeString[1][0]
    }

    return (
        <div className="flex items-center my-3">
            <Link to={`/${activity.displayName}`}>
                <div className="overflow-hidden rounded-full w-[44px] h-[44px] mr-3">
                    <img alt="userPhoto" src={`${activity.imageUrl ? activity.imageUrl : process.env.PUBLIC_URL + '/images/standart-profile.png'}`} className='w-full h-full object-cover' />
                </div>
            </Link>
            <div className="w-full flex">
                <Link to={`/${activity.displayName}`}>
                    <p className="font-semibold text-sm mr-2">{activity.displayName}</p>
                </Link>
                <p className="text-sm mr-1">liked your photo.</p>
                <p className="text-sm text-gray-500/70">{currentTimeString}</p>
            </div>
            <div className="min-w-[40px] h-[40px]">
                <Link to={`/${userRedux.displayName}/${activity.post.uid}`}>
                    <img alt="postPhoto" src={activity.post.imageUrl} className='object-cover w-[40px] h-[40px]' />
                </Link>
            </div>
        </div>
    )
}

export default React.memo(LikeItem)