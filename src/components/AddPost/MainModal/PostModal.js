import React, { useState } from "react";
import PostModalOne from "../SecondaryModals/PostModalOne";
import PostModalTwo from "../SecondaryModals/PostModalTwo";

const PostModal = ({ activeModal, setActiveModal }) => {
    const [page, setPage] = useState(0)
    const [post, setPost] = useState(
        {
            images: []
        }
    )

    return (
        <>
            {
                page === 0 &&
                (
                    <PostModalOne
                        activeModal={activeModal}
                        setActiveModal={setActiveModal}
                        setPage={setPage}
                        setPost={setPost}
                        post={post}
                    />
                )
            }
            {
                page === 1 &&
                (
                    <PostModalTwo
                        activeModal={activeModal}
                        setActiveModal={setActiveModal}
                        setPage={setPage}
                        setPost={setPost}
                        post={post}
                        page = {page}
                    />

                )
            }
        </>
    )

}

export default PostModal