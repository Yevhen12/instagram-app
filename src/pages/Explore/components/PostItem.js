import React, { useState } from "react";
import { Link } from "react-router-dom";
import { gridCounter } from '../../../helpers/gridCounter'

const PostItem = ({ post, idx }) => {
    const [isHovered, setIsHovered] = useState(false)

    console.log(post.image)

    const isBigPost = gridCounter(idx + 1)
    return (
        <>

            <div
                className={` border relative cursor-pointer aspect-square bg-black ${isBigPost ? 'row-span-2 col-span-2' : 'row-span-1 col-span-1'}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Link to={`${post.user.displayName}/${post.uid}`}>
                    {
                        isHovered &&
                        (

                            <div className='w-full h-full absolute flex justify-center items-center bg-black/25'>
                                <div className="flex items-center mr-5">
                                    <img alt="likes" src={process.env.PUBLIC_URL + "/images/heart-white-icon.png"} className="w-5 h-5 mr-2" />
                                    <p className="text-white text-sm font-semibold">{post.likes.length}</p>
                                </div>
                                <div className="flex items-center">
                                    <img alt="comments" src={process.env.PUBLIC_URL + "/images/speech-bubble-white-icon.png"} className="w-5 h-5 mr-2" />
                                    <p className="text-white text-sm font-semibold">{post.comments.length}</p>
                                </div>
                            </div>

                        )
                    }
                    <img alt="userPhoto" src={post.image} className="w-full h-full object-cover" />
                    
                </Link>
            </div>
        </>
    )
}

export default React.memo(PostItem)