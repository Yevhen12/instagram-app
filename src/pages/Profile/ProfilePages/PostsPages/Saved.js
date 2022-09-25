import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../Post/Post";
import { Outlet } from "react-router-dom";
import { setUser } from "../../../../redux/actions/userActions";
import Loading from "../../../../components/Loaders/Loaging";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";

const Saved = () => {

    const [oldSavedPost, setOldSavedPost] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const userRedux = useSelector(state => state.userReducer.user)
    const dispatch = useDispatch()


    useEffect(() => {
        setIsLoading(true)

        const getPosts = async () => {
            const refUser = doc(db, 'users', userRedux.uid)
            const docUser = await getDoc(refUser)

            const userData = docUser.data()

            dispatch(setUser(userData))

            userData.savedPosts.forEach(async (elem) => {
                const userCurrentProfileDoc = doc(db, 'users', elem.user.uid)
                const userSnap = await getDoc(userCurrentProfileDoc);
                const userToUpdate = userSnap.data()

                const postUpdate = userToUpdate.posts.find(elemPost => elemPost.uid === elem.uid)

                setOldSavedPost(prevPost => [...prevPost, postUpdate])
            })
            setIsLoading(false)
        }

        getPosts()

    }, [])

    console.log(isLoading)
    console.log()


    const mapSavedPosts = useMemo(() => oldSavedPost.map(elem => <Post key={elem.uid} post={elem} />), [oldSavedPost])

    return (
        <>

            {
                isLoading ?
                    (
                        <div className="mt-10 mr-8"><Loading height={40} width={40} /></div>
                    )
                    :
                    (
                        userRedux.savedPosts.length > 0 ?
                            (
                                <>
                                    <div className="grid sm:gap-3 lg:gap-7 gap-1 grid-cols-3 grid-cols-3 auto-cols-[300px] auto-rows-auto mt-3">
                                        {mapSavedPosts}
                                    </div>
                                    <Outlet context={{ savedPosts: oldSavedPost }} />
                                </>
                            )
                            :
                            (
                                <div className="mt-10">
                                    <div className="flex justify-between">
                                        <p className="text-xs opacity-50">Only you can see what you've saved</p>
                                        <button className="text-sky-500 text-sm font-semibold" type="button">+ New collection</button>
                                    </div>

                                    <div>
                                        <p className="mt-32 text-xl text-center opacity-50 italic">Here can be your saved photos and videos</p>
                                    </div>
                                </div>
                            )
                    )
            }
        </>

    )
}

export default React.memo(Saved)