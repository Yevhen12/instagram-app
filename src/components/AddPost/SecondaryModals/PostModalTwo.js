import React, { useState } from "react";
import ReusebleModal from "../../Modals/ReusebleModal";
import HeaderModal from "./PostModalTwo/ModalHeader";
import ModalBody from "./PostModalTwo/ModalBody";

const PostModalTwo = ({ activeModal, setActiveModal, setPage, setPost, post }) => {

    const [text, setText] = useState('')

    const closeModal = () => {
        setPage(0)
        setPost({
            images: []
        })
    }

    return (
        <ReusebleModal
            activeModal={activeModal}
            setActiveModal={setActiveModal}
            styleForContainerBlock='fixed w-screen h-screen top-0 left-0 right-0 flex justify-center items-center z-20 cursor-default bg-black/60 duration-300'
            closeModal={closeModal}
        >
            <div
                className={`mx-5 max-w-[1050px] w-full h-[80vh] bg-white rounded-xl duration-300 ${activeModal ? 'opacity-1 scale-100' : 'opacity-0 scale-50'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <HeaderModal
                    setPage={setPage}
                    post={post}
                    text={text}
                    setPost={setPost}
                    setActiveModal={setActiveModal}
                />
                <ModalBody
                    text={text}
                    setText={setText}
                    post={post}
                />

            </div>

        </ReusebleModal>
    )
}

export default PostModalTwo