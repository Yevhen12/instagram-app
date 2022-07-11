import React, { useState } from "react";
import ReusebleModal from "../../ReusebleModal";
import AreUSureModal from "./AreUSureModal";

const PostModalOne = ({ activeModal, setActiveModal, setPage, setPost, post }) => {


    const addImage = (e) => {
        if (e.target.files) {
            setPost(prevPost => {
                return {
                    ...prevPost,
                    images: [...prevPost.images, e.target.files[0]]
                }
            })
        }
    }

    const backToChoose = () => {
        setPost({
            images: []
        })
    }

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
                <div className='border-b h-[50px]'>
                    {post.images.length > 0 ?
                        (
                            <div className='flex justify-between h-full items-center px-5'>
                                <button onClick={() => backToChoose()}>
                                    <img src="/images/left-arrow-icon.png" className="w-7 h-7" alt="back" />
                                </button>
                                <p className="font-semibold">Crop</p>
                                <button onClick = {() => setPage(prevPage => prevPage + 1)} className="text-sm font-semibold text-[#0195f6]">Next</button>
                            </div>
                        )
                        :
                        (
                            <div className='flex justify-center h-full items-center'>
                                <p className="py-3 font-semibold">Create new post</p>
                            </div>
                        )
                    }

                </div>
                <div className="flex flex-col items-center justify-center w-full h-[calc(100%-50px)]">
                    {
                        post.images[0] ?
                            (
                                <img alt = 'postphoto' src={URL.createObjectURL(post.images[0])} className="w-full h-full object-cover rounded-b-xl" />
                            )
                            :
                            (
                                <>
                                    <div className="w-20 h-20 mb-5">
                                        <img src="/images/multimedia-icon.png" />
                                    </div>
                                    <p className="font-light text-2xl mb-5 cursor-text">Drag photos and videos here</p>
                                    <div>
                                        <label className="px-2.5 py-1.5 font-semibold text-white bg-[#0195f6] rounded text-sm cursor-pointer">
                                            Select from computer
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => addImage(e)}
                                            />
                                        </label>
                                    </div>
                                </>
                            )
                    }

                </div>
            </div>


        </ReusebleModal >
    )
}

export default PostModalOne