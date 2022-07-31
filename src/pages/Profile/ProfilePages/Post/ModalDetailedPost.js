import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link, useLocation, useOutletContext } from "react-router-dom";
import ReusebleModal from "../../../../components/Modals/ReusebleModal";
import IteractionMenuPost from './IteactionMenuPost';
import Comment from "./Comment/Comment";
import convertUnixTime from "../../../../helpers/converUnixTime";
import { Context } from "../../../../context/firebaseContext";



const ModalDetailedPost = () => {
    const [activeModal, setActiveModal] = useState(false)
    const [updatedCurrentPost, setUpdatedCurrentPost] = useState({})
    const { userPost, savedPost, user } = useParams()

    const { posts, savedPosts } = useOutletContext()
    const { doc, db, getDoc, collection, where, getDocs, query } = useContext(Context)

    const navigate = useNavigate()
    const location = useLocation()

    const isSavedPostArray = location.pathname.split('/').includes('saved')
    const isDashboard = location.pathname.split('/').includes('dashboard')
    const isExplore = location.pathname.split('/').includes('explore')
    const isDirect = location.pathname.split('/').includes('direct')

    console.log(savedPosts, 'dfsdfsdf', posts)

    const postsToIterate = (isSavedPostArray ? savedPosts : posts)
    console.log(postsToIterate)

    const currentPost = postsToIterate.find(elem => isSavedPostArray ? elem.uid === savedPost : elem.uid === userPost)

    const postToShow = currentPost ? currentPost : updatedCurrentPost



    useEffect(() => {
        if (!currentPost) {

            const getPost = async () => {
                const usersRef = collection(db, "users");
                const q = query(usersRef, where("displayName", "==", `${user}`))
                console.log(user)
                const docSnap = await getDocs(q)
                let userData
                docSnap.forEach((doc) => {
                    userData = doc.data()
                })
                const postInUser = userData.posts.find(elem => elem.uid === userPost)

                setUpdatedCurrentPost(postInUser)
            }
            getPost()
        } else {
            const getPost = async () => {
                const userRef = doc(db, 'users', currentPost.user.uid)
                const userSnap = await getDoc(userRef)

                const userData = userSnap.data()

                const postInUser = userData.posts.find(elem => elem.uid === currentPost.uid)

                setUpdatedCurrentPost(postInUser)
            }
            getPost()
        }
    }, [userPost])

    useEffect(() => {
        setActiveModal(true)
    }, [])

    const closeModal = () => {
        navigate(-1)
    }

    let currentTimeString = updatedCurrentPost && convertUnixTime(updatedCurrentPost.uid).split(' ')
    currentTimeString = currentTimeString[1] === 'Now' ? 'Now' : currentTimeString[0] + currentTimeString[1][0]


    const mapedArrayComments = updatedCurrentPost && updatedCurrentPost.comments && updatedCurrentPost.comments.length > 0 && updatedCurrentPost.comments.map(elem => (
        <Comment
            key={elem.createdAt}
            updatedCurrentPost={updatedCurrentPost}
            setUpdatedCurrentPost={setUpdatedCurrentPost}
            postComment={elem}
        />
    ))

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


    console.log(updatedCurrentPost)
    return (
        <ReusebleModal
            activeModal={activeModal}
            setActiveModal={setActiveModal}
            styleForContainerBlock='fixed w-screen h-screen top-0 left-0 right-0 flex justify-center items-center z-20 cursor-default bg-black/60 duration-300'
            closeModal={closeModal}
        >

            {
                isNextPostExist && !isSavedPostArray && !isDashboard && !isExplore && !isDirect &&
                <div className="h-8 w-8 bg-white absolute top-[50%] sm:right-[30px] right-[10px] rounded-full cursor-pointer" onClick={(e) => nextPost(e)}>
                    <img alt="next" src={process.env.PUBLIC_URL + "/images/down-arrow.png"} className="w-5 h-5 rotate-[270deg] mt-1.5 ml-1.5" />
                </div>
            }

            {
                isPrevPostExist && !isSavedPostArray && !isDashboard && !isExplore && !isDirect &&
                <div className="h-8 w-8 bg-white absolute top-[50%] sm:left-[30px] left-[10px] rounded-full cursor-pointer" onClick={(e) => prevPost(e)}>
                    <img alt="next" src={process.env.PUBLIC_URL + "/images/down-arrow.png"} className="w-5 h-5 rotate-[90deg] mt-1.5 ml-1" />
                </div>
            }
            <div className={`max-w-[70%] w-full bg-white max-h-[85%] h-full my-5 flex lg:flex-row flex-col items-center rounded-r-md`} onClick={(e) => e.stopPropagation()}>
                <div className="lg:w-3/5 w-full lg:h-full h-[40%] bg-black">
                    <img
                        src={postToShow?.image}
                        className="h-full w-full object-contain"
                    />
                </div>
                <div className="lg:w-2/5 w-full lg:h-full h-[60%]">
                    <div className="flex flex-col h-full">
                        <div className="h-[60px] flex justify-between items-center border-b">
                            <div className="flex items-center h-full">
                                <Link to={`/${postToShow?.user?.displayName}`}>
                                    <img className={"w-8 h-8 rounded-full object-cover mx-5"} alt="userPhoto" src={(updatedCurrentPost && updatedCurrentPost.user && updatedCurrentPost.user.imageUrl) ? updatedCurrentPost.user.imageUrl : process.env.PUBLIC_URL +  '/images/standart-profile.png'} />
                                </Link>
                                <Link to={`/${postToShow?.user?.displayName}`}>
                                    <p className="font-semibold text-sm mt-1">{postToShow?.user?.displayName}</p>
                                </Link>
                            </div>
                            <div>
                                <img alt="option" src={process.env.PUBLIC_URL + "/images/option-icon.png"} className="w-5 h-5 cursor-pointer mx-5" />
                            </div>
                        </div>
                        <div className="h-[calc(100%-220px)] w-full border-b overflow-hidden">
                            {
                                postToShow && postToShow.comments && postToShow.comments.length > 0 || postToShow && postToShow.text && postToShow.text.length > 0 ?
                                    (
                                        <div className="flex flex-col h-full overflow-y-scroll pt-6">
                                            {postToShow?.text.length > 0 &&
                                                (
                                                    <div className="flex justify-between px-5 mb-5">
                                                        <div className="mr-5">
                                                            <Link to={`/${postToShow?.user.displayName}`}>
                                                                <img alt="userPhoto" src={`${postToShow?.user?.imageUrl || process.env.PUBLIC_URL + '/images/standart-profile.png'}`} className='w-8 h-8 object-cover rounded-full' />
                                                            </Link>
                                                        </div>
                                                        <div style={{ wordWrap: "break-word" }} className="flex flex-col w-full max-w-[calc(100%-65px)] text-sm ">
                                                            <Link to={`/${postToShow?.user?.displayName}`}>
                                                                <p className="text-sm font-semibold">{postToShow?.user?.displayName}</p>
                                                            </Link>
                                                            <p className="text-sm mb-3">{postToShow?.text}</p>
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
                        <IteractionMenuPost currentPost={currentPost ? currentPost : postToShow} updatedCurrentPost={updatedCurrentPost} setUpdatedCurrentPost={setUpdatedCurrentPost} isCurrentPostSaved={isSavedPostArray ? true : false} />
                    </div>
                </div>
            </div>
        </ReusebleModal>
    )
}

export default React.memo(ModalDetailedPost)