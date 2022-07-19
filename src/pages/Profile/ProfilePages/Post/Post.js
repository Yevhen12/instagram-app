import React, { useState } from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
    const [isHovered, setIsHovered] = useState(false)
    return (
        <>
            <Link to={post.uid}>
                <div
                    className="w-[300px] h-[300px] border mx-3.5 mb-7 relative cursor-pointer bg-black"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {
                        isHovered &&
                        (

                            <div className='w-full h-full absolute flex justify-center items-center bg-black/25'>
                                <div className="flex items-center mr-5">
                                    <img alt="likes" src="/images/heart-white-icon.png" className="w-5 h-5 mr-2" />
                                    <p className="text-white text-sm font-semibold">{post.likes.length}</p>
                                </div>
                                <div className="flex items-center">
                                    <img alt="comments" src="/images/speech-bubble-white-icon.png" className="w-5 h-5 mr-2" />
                                    <p className="text-white text-sm font-semibold">{post.comments.length}</p>
                                </div>
                            </div>

                        )
                    }

                    <img alt="userPhoto" src={post.image} className="w-full h-full object-contain" />
                </div>
            </Link>
        </>
    )
}

export default Post