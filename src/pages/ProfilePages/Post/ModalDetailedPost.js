import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ReusebleModal from "../../../components/ReusebleModal";
import IteractionMenuPost from "./IteactionMenuPost";
import Comment from "./Comment";

const ModalDetailedPost = () => {
    const [activeModal, setActiveModal] = useState(false)
    const currenUserInProfile = useSelector(state => state.currentProfileUserReducer.user)
    const { userPost, user } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        setActiveModal(true)
    }, [])


    const closeModal = () => {
        navigate(`/${currenUserInProfile.displayName}`)

    }
    console.log(currenUserInProfile)

    const currentPost = currenUserInProfile.posts.find(elem => elem.uid === userPost)

    const mapedArrayComments = currentPost.comments.map(elem => <Comment key = {elem.createdAt} postComment={elem} />)


    console.log(userPost, user)
    console.log(currenUserInProfile)
    return (
        <ReusebleModal
            activeModal={activeModal}
            setActiveModal={setActiveModal}
            styleForContainerBlock='fixed w-screen h-screen top-0 left-0 right-0 flex justify-center items-center z-20 cursor-default bg-black/60 duration-300'
            closeModal={closeModal}
        >
            <div className={`max-w-[70%] w-full bg-white max-h-[85%] h-full my-5 flex items-center rounded-r-md ${activeModal ? 'scale-100' : 'scale-50'}`} onClick={(e) => e.stopPropagation()}>
                <div className="w-3/5 h-full">
                    <img
                        src={currentPost.image}
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="w-2/5 h-full">
                    <div className="flex flex-col h-full">
                        <div className="h-[60px] flex justify-between items-center border-b">
                            <div className="flex items-centerh-full">
                                <Link to={`/${currenUserInProfile.displayName}`}>
                                    <img className="w-8 h-8 rounded-full object-cover mx-5" src={`${currenUserInProfile.imageUrl ? currenUserInProfile.imageUrl : '/images/standart-profile.png'}`} />
                                </Link>
                                <Link to={`/${currenUserInProfile.displayName}`}>
                                    <p className="font-semibold text-sm mt-1">{currenUserInProfile.displayName}</p>
                                </Link>
                            </div>
                            <div>
                                <img alt="option" src="/images/option-icon.png" className="w-5 h-5 cursor-pointer mx-5" />
                            </div>
                        </div>
                        <div className="h-[calc(100%-220px)] w-full border-b overflow-hidden">
                            {
                                currentPost.comments.length > 0 ?
                                    (
                                        <div className="flex flex-col h-full overflow-y-scroll pt-6">
                                            {mapedArrayComments}
                                        </div>
                                    )
                                    :
                                    (
                                        <div className="flex flex-col justify-center items-center h-full">
                                            <p className="font-semibold text-2xl">No comments yet.</p>
                                            <p className="font-light">Start the conversation.</p>
                                        </div>
                                    )
                            }
                        </div>
                        <IteractionMenuPost currentPost={currentPost} />
                    </div>
                </div>
            </div>
        </ReusebleModal>
    )
}

export default ModalDetailedPost