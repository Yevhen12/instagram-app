import React from "react";
import LikeItem from "./Items/LikeItem";
//            {activity.type === 'follower' && <FollowerItem activity={activity} />}
//            {activity.type === 'comment' && <CommentItem activity={activity} />}
const Activity = ({ activity }) => {
    return (
        <>

            {activity.type === 'like' && <LikeItem activity={activity} />}

        </>
    )
}

export default Activity