import React from "react";

const LikeItem = ({activity}) => {
    return (
        <div className="flex">
            <div className="overflow-hidden rounded-full w-[44px] h-[44px]">
                <img alt="userPhoto" src={`${activity.user.imageUrl ? activity.user.imageUrl : '/images/standart-profile.png'}`} className = 'w-full h-full object-cover'/>
            </div>
        </div>
    )
}

export default LikeItem