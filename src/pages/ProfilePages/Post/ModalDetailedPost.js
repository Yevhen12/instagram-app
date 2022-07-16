import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link, useLocation, useOutletContext } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReusebleModal from "../../../components/ReusebleModal";
import IteractionMenuPost from "./IteactionMenuPost";
import Comment from "./Comment";
import { setCurrentPost } from "../../../redux/actions/currentPostAction";
import convertUnixTime from "../../../helpers/converUnixTime";



const ModalDetailedPost = () => {
    const [activeModal, setActiveModal] = useState(false)
    const currenUserInProfile = useSelector(state => state.currentProfileUserReducer.user)
    const currentPostRedux = useSelector(state => state.currentPostReducer.post)
    const { userPost, user, savedPost } = useParams()
    const dispatch = useDispatch()

    const { posts, savedPosts } = useOutletContext()

    const navigate = useNavigate()
    const location = useLocation()

    const isSavedPostArray = location.pathname.split('/').includes('saved')

    const postsToIterate = (isSavedPostArray ? savedPosts : posts).sort((a, b) => b.uid - a.uid)


    const currentPost = postsToIterate.find(elem => isSavedPostArray ? elem.uid === savedPost : elem.uid === userPost)

    useEffect(() => {
        setActiveModal(true)
    }, [])

    useEffect(() => {
        dispatch(setCurrentPost(currentPost))
    }, [userPost, savedPost])


    const closeModal = () => {
        navigate(-1)
    }
    
    let currentTimeString = convertUnixTime(currentPost.uid).split(' ')
    currentTimeString = currentTimeString[1] === 'Now' ? 'Now' : currentTimeString[0] + currentTimeString[1][0]

    const mapedArrayComments = currentPostRedux && currentPostRedux.comments && currentPostRedux.comments.length > 0 && currentPostRedux.comments.map(elem => <Comment key={elem.createdAt} postComment={elem} />)

    const isNextPostExist = postsToIterate.find(elem => {
        if (Number(elem.uid) < Number(userPost)) return elem

        return false
    })



    const isPrevPostExist = postsToIterate.find((elem, idx) => {
        if (Number(elem.uid) > Number(userPost) && postsToIterate[idx + 1] && postsToIterate[idx + 1].uid === userPost) return elem
        return false
    })

    const nextPost = (e) => {
        e.stopPropagation()
        navigate(`../${isNextPostExist.uid}`, { replace: true });
    }

    const prevPost = (e) => {
        e.stopPropagation()
        navigate(`../${isPrevPostExist.uid}`, { replace: true });
    }



    return (
        <ReusebleModal
            activeModal={activeModal}
            setActiveModal={setActiveModal}
            styleForContainerBlock='fixed w-screen h-screen top-0 left-0 right-0 flex justify-center items-center z-20 cursor-default bg-black/60 duration-300'
            closeModal={closeModal}
        >

            {
                isNextPostExist &&
                <div className="h-8 w-8 bg-white absolute top-[50%] right-[30px] rounded-full cursor-pointer" onClick={(e) => nextPost(e)}>
                    <img alt="next" src="/images/down-arrow.png" className="w-5 h-5 rotate-[270deg] mt-1.5 ml-1.5" />
                </div>
            }

            {
                isPrevPostExist &&
                <div className="h-8 w-8 bg-white absolute top-[50%] left-[30px] rounded-full cursor-pointer" onClick={(e) => prevPost(e)}>
                    <img alt="next" src="/images/down-arrow.png" className="w-5 h-5 rotate-[90deg] mt-1.5 ml-1" />
                </div>
            }
            <div className={`max-w-[70%] w-full bg-white max-h-[85%] h-full my-5 flex items-center rounded-r-md`} onClick={(e) => e.stopPropagation()}>
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
                                <Link to={`/${currentPost.user.displayName}`}>
                                    <img className="w-8 h-8 rounded-full object-cover mx-5" src={`${currentPost.user.imageUrl ? currentPost.user.imageUrl : '/images/standart-profile.png'}`} />
                                </Link>
                                <Link to={`/${currentPost.user.displayName}`}>
                                    <p className="font-semibold text-sm mt-1">{currentPost.user.displayName}</p>
                                </Link>
                            </div>
                            <div>
                                <img alt="option" src="/images/option-icon.png" className="w-5 h-5 cursor-pointer mx-5" />
                            </div>
                        </div>
                        <div className="h-[calc(100%-220px)] w-full border-b overflow-hidden">
                            {
                                currentPost.comments.length > 0 || currentPost.text.length > 0 ?
                                    (
                                        <div className="flex flex-col h-full overflow-y-scroll pt-6">
                                            {currentPost.text.length > 0 &&
                                                (
                                                    <div className="flex justify-between px-5 mb-5">
                                                        <div className="mr-5">
                                                            <Link to={`/${currentPost.user.displayName}`}>
                                                                <img alt="userPhoto" src={`${currentPost.user?.imageUrl || '/images/standart-profile.png'}`} className='w-8 h-8 object-cover rounded-full' />
                                                            </Link>
                                                        </div>
                                                        <div style={{ wordWrap: "break-word" }} className="flex flex-col w-full max-w-[calc(100%-65px)] text-sm ">
                                                            <Link to={`/${currentPost.user.displayName}`}>
                                                                <p className="text-sm font-semibold">{currentPost.user.displayName}</p>
                                                            </Link>
                                                            <p className="text-sm mb-3">{currentPost.text}</p>
                                                            <div className="flex justify-start">
                                                                <p className="text-xs text-black/50 mr-4">{currentTimeString}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
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
                        <IteractionMenuPost currentPost={currentPost} isCurrentPostSaved={isSavedPostArray ? true : false} />
                    </div>
                </div>
            </div>
        </ReusebleModal>
    )
}

export default ModalDetailedPost