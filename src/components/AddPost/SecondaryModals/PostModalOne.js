import React from "react";
import ReusebleModal from "../../Modals/ReusebleModal";
import WithImageModal from "./PostModalOne/WithImageModal";
import ModalHeader from "./PostModalOne/ModalHeader";


const PostModalOne = ({ activeModal, setActiveModal, setPage, setPost, post }) => {


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
            <div className={`mx-5 max-w-[700px] w-full h-[80vh] bg-white rounded-xl duration-300 ${activeModal ? 'opacity-1 scale-100' : 'opacity-0 scale-50'}`} onClick={(e) => e.stopPropagation()}>
                <ModalHeader post={post} setPost={setPost} setPage={setPage} />
                <WithImageModal post={post} setPost={setPost} />
            </div>


        </ReusebleModal >
    )
}

export default React.memo(PostModalOne)