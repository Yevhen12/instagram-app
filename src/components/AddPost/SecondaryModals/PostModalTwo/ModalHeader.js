import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Context } from "../../../../context/firebaseContext";
import { useParams } from "react-router-dom";
import Loading from "../../../Loaders/Loaging";
import { setPostsToUser } from "../../../../redux/actions/thunks/userActions/setPostsToUser";

const HeaderModal = ({ setPage, post, text, setActiveModal, setPost }) => {

    const userRedux = useSelector(state => state.userReducer.user)
    const currentProfileUser = useSelector(state => state.currentProfileUserReducer.user)
    const [isLoading, setIsLoading] = useState(false)
    const { setFirestoreCurrentUser } = useContext(Context)

    const dispatch = useDispatch()

    const { user } = useParams()

    const backFunc = () => {
        setPage(prevPage => prevPage - 1)
    }

    const createPost = async () => {
        setIsLoading(true)
        dispatch(setPostsToUser(userRedux, post, setFirestoreCurrentUser, currentProfileUser, user, text, setIsLoading))

        setPage(0)
        setPost({
            images: []
        })
        setIsLoading(false)
        setActiveModal(false)

    }

    return (
        <>
            <div className='border-b h-[50px]'>
                <div className='flex justify-between h-full items-center px-5'>
                    <button onClick={() => backFunc()}>
                        <img src={process.env.PUBLIC_URL + "/images/left-arrow-icon.png"} className="w-7 h-7" alt="back" />
                    </button>
                    <p className="font-semibold">Create new post</p>
                    <button onClick={() => createPost()} type='button'>
                        <div className="flex items-center">
                            <p className="text-sm font-semibold text-[#0195f6] mr-1">Share</p>
                            {isLoading && <Loading width={15} height={15} />}
                        </div>
                    </button>
                </div>
            </div>
        </>
    )
}

export default React.memo(HeaderModal)