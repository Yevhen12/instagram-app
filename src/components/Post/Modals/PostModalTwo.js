import React, { useState, useContext } from "react";
import ReusebleModal from "../../ReusebleModal";
import { useSelector, useDispatch } from "react-redux";
import Picker from 'emoji-picker-react'
import { Context } from "../../../context/firebaseContext";
import { setUser } from "../../../redux/actions/userActions";
import { setCurrentProfileUser } from "../../../redux/actions/currentProfileUser";
import { useParams } from "react-router-dom";

const PostModalTwo = ({ activeModal, setActiveModal, setPage, setPost, post }) => {

    const [text, setText] = useState('')
    const [showPicker, setShowPicker] = useState(false)
    const { storage, db, updateDoc, ref, doc, uploadBytes, getDownloadURL, setFirestoreCurrentUser } = useContext(Context)
    const { user } = useParams()

    const closeModal = () => {
        setPage(0)
        setPost({
            images: []
        })
    }

    const backFunc = () => {
        setPage(prevPage => prevPage - 1)
    }

    const changeText = (e) => {
        const { value } = e.target
        setText(value)
    }
    const dispatch = useDispatch()
    const userRedux = useSelector(state => state.userReducer.user)
    const currentProfileUser = useSelector((state) => state.currentProfileUserReducer.user)

    const onEmojiClick = (event, emojiObject) => {
        setText(prevText => prevText + emojiObject.emoji)
        setShowPicker(false)
    }

    const createPost = async () => {

        const { displayName, uid, imageUrl } = userRedux
        const pathName = `/images/${userRedux.uid}/posts/${post.images[0].name}`
        const fileReff = ref(storage, pathName);

        await uploadBytes(fileReff, post.images[0])

        const image = await getDownloadURL(fileReff)

        const newPost = {
            image,
            text,
            comments: [],
            likes: [],
            uid: new Date().getTime().toString(),
            user: { displayName, uid, imageUrl }
        }

        await updateDoc(doc(db, "users", userRedux.uid), {
            "posts": [...userRedux.posts, newPost]
        })

        dispatch(setUser({ ...userRedux, posts: [newPost, ...userRedux.posts] }))
        setFirestoreCurrentUser({ ...userRedux, posts: [newPost, ...userRedux.posts] })
        if (!user || user === userRedux.displayName) {
            dispatch(setCurrentProfileUser({ ...currentProfileUser, posts: [newPost, ...currentProfileUser.posts] }))
        }

        setPage(0)
        setPost({
            images: []
        })
        setActiveModal(false)

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
                <div className='border-b h-[50px]'>
                    <div className='flex justify-between h-full items-center px-5'>
                        <button onClick={() => backFunc()}>
                            <img src="/images/left-arrow-icon.png" className="w-7 h-7" alt="back" />
                        </button>
                        <p className="font-semibold">Create new post</p>
                        <button onClick={() => createPost()} className="text-sm font-semibold text-[#0195f6]">Share</button>
                    </div>
                </div>
                <div className="flex h-[calc(100%-50px)]">
                    <div className="w-[700px] h-full">
                        <img alt='postphoto' src={URL.createObjectURL(post.images[0])} className="w-full h-full object-cover rounded-bl-xl" />
                    </div>
                    <div className="w-[calc(100%-700px)] py-5">
                        <div className="flex flex-col">
                            <div className="flex">
                                <div className="overflow-hidden mr-3 pl-5">
                                    <img alt="userPhoto" src={userRedux.imageUrl ? userRedux.imageUrl : '/images/standart-profile.png'} className="w-7 h-7 object-cover rounded-full" />
                                </div>
                                <p className="font-semibold mt-0.5">{userRedux.displayName}</p>
                            </div>
                            <textarea value={text} className="outline-none mt-5 resize-none h-[170px] px-5" placeholder="Write a caption..." onChange={(e) => changeText(e)}></textarea>
                            <div className="h-[50px] flex justify-between items-center border-b">
                                <button className="pl-5" onClick={() => setShowPicker(prevShowPicker => !prevShowPicker)}>
                                    <img alt="emoji" src="/images/smile-icon.png" className="w-5 h-5 opacity-50" />
                                </button>
                                {
                                    showPicker &&
                                    (
                                        <div
                                            className={`w-full h-full fixed top-0 left-0 items-center z-20 ${showPicker ? 'pointer-events-auto' : 'pointer-events-none'}`}
                                            onClick={() => setShowPicker(false)}
                                        >
                                            <div onClick={(e) => e.stopPropagation()}>
                                                <Picker
                                                    onEmojiClick={onEmojiClick}
                                                    pickerStyle={
                                                        {
                                                            width: '280px',
                                                            position: "absolute",
                                                            top: '335px',
                                                            left: '700px',
                                                            heigth: '100px'
                                                        }
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )
                                }
                                <p className="text-xs text-black/40 pr-5">{text.length} / 2,200</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </ReusebleModal>
    )
}

export default PostModalTwo