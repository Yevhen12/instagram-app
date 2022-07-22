import React, { useEffect, useState } from "react";
import * as ROUTES from '../../../../../../constants/pagesLinks'
import { Link } from "react-router-dom";
import LikeComment from "../../../../../Profile/ProfilePages/Post/Comment/LikeComment";

const OneComment = ({ post, updatedCurrentPost, setUpdatedCurrentPost }) => {

    const [active, setActive] = useState(false)

    useEffect(() => {
        if (updatedCurrentPost) setActive(true)
    }, [updatedCurrentPost])
    
    return (
        <div className="flex flex-row px-3 mt-2 w-full">
            <p style={{ wordWrap: "break-word" }} className="text-sm font-semibold mr-2 hover:underline">
                <Link to={`${ROUTES.HOME}${post.user.displayName}`}>
                    {post.user.displayName}
                </Link>
            </p>
            <p className="text-sm w-full">{post.comments[post.comments.length - 1].text}</p>
            {active &&
                <LikeComment
                    postComment={post.comments[post.comments.length - 1]}
                    updatedCurrentPost={updatedCurrentPost && updatedCurrentPost}
                    setUpdatedCurrentPost={setUpdatedCurrentPost}
                />
            }
        </div>

    )
}

export default OneComment