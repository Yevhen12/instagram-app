import React from "react";

const WithImageModal = ({post, setPost}) => {

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


    return (
        <div className="flex flex-col items-center justify-center w-full h-[calc(100%-50px)]">
        {
            post.images[0] ?
                (
                    <img alt='postphoto' src={URL.createObjectURL(post.images[0])} className="w-full h-full object-contain rounded-b-xl bg-black" />
                )
                :
                (
                    <>
                        <div className="w-20 h-20 mb-5">
                            <img src={process.env.PUBLIC_URL + "/images/multimedia-icon.png"} />
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
    )
}

export default React.memo(WithImageModal)