import React, {useContext} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Context } from "../../../../context/firebaseContext";
import { setUser } from "../../../../redux/actions/userActions";
import { useParams } from "react-router-dom";
import { setCurrentProfileUser } from "../../../../redux/actions/currentProfileUser";

const HeaderModal = ({setPage, post, text, setActiveModal, setPost}) => {

    const userRedux = useSelector(state => state.userReducer.user)
    const currentProfileUser = useSelector(state => state.currentProfileUserReducer.user)
    const { storage, db, updateDoc, ref, doc, uploadBytes, getDownloadURL, setFirestoreCurrentUser } = useContext(Context)

    const dispatch = useDispatch()

    const { user } = useParams()

    const backFunc = () => {
        setPage(prevPage => prevPage - 1)
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
        <>
            <div className='border-b h-[50px]'>
                <div className='flex justify-between h-full items-center px-5'>
                    <button onClick={() => backFunc()}>
                        <img src="/images/left-arrow-icon.png" className="w-7 h-7" alt="back" />
                    </button>
                    <p className="font-semibold">Create new post</p>
                    <button onClick={() => createPost()} className="text-sm font-semibold text-[#0195f6]">Share</button>
                </div>
            </div>
        </>
    )
}

export default HeaderModal