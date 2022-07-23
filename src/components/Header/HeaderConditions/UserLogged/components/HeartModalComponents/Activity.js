import React from "react";
import LikeItem from "./Items/LikeItem";
import CommentItem from "./Items/CommentItem";
import FollowerItem from "./Items/FollowerItem";


const Activity = ({ activity }) => {
    return (
        <>
            {activity.type === 'like' && <LikeItem activity={activity} />}
            {activity.type === 'comment' && <CommentItem activity={activity} />}
            {activity.type === 'follower' && <FollowerItem activity={activity} />}
        </>
    )
}

export default Activity