import React from "react";



const ModalHeader = ({setPage, post, setPost}) => {

    const backToChoose = () => {
        setPost({
            images: []
        })
    }


    return (
        <div className='border-b h-[50px]'>
        {
            post.images.length > 0 ?
                (
                    <div className='flex justify-between h-full items-center px-5'>
                        <button onClick={() => backToChoose()}>
                            <img src={process.env.PUBLIC_URL + "/images/left-arrow-icon.png"} className="w-7 h-7" alt="back" />
                        </button>
                        <p className="font-semibold">Crop</p>
                        <button onClick={() => setPage(prevPage => prevPage + 1)} className="text-sm font-semibold text-[#0195f6]">Next</button>
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
    )
}

export default React.memo(ModalHeader)