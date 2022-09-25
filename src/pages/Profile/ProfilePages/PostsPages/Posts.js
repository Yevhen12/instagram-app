import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Post from "../Post/Post";
import { setCurrentProfileUser } from "../../../../redux/actions/currentProfileUser";
import { useLocation, Outlet, useParams } from "react-router-dom";
import { getDocs, where, query, collection } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";



const Posts = () => {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const userRedux = useSelector((state) => state.userReducer.user)
    const currentProfileUserRedux = useSelector((state) => state.currentProfileUserReducer.user)
    const isUserOnStrangeProfile = userRedux.uid !== currentProfileUserRedux.uid
    const dispatch = useDispatch()
    const location = useLocation()
    const {user} = useParams()

    useEffect(() => {
        setIsLoading(true)
        const getPosts = async () => {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("displayName", "==", `${user}`))
            console.log(user)
            const docSnap = await getDocs(q)
            docSnap.forEach((doc) => {
                setPosts(doc.data().posts)
                dispatch(setCurrentProfileUser(doc.data()));
            })
            setIsLoading(false)
        }

        getPosts()

    }, [location.pathname])


    const mapPosts = posts.length > 0 && posts.sort((a, b) => {
        if (b.uid && a.uid) return b.uid - a.uid

        return a || b

    }).map(elem => <Post key={elem.uid} post={elem} />)

    return (
        <>
            {isUserOnStrangeProfile ?
                (
                    posts.length > 0 ?
                        (
                            <>
                                <div className="grid sm:gap-3 lg:gap-7 gap-1 grid-cols-3 grid-cols-3 auto-cols-[300px] auto-rows-auto mt-3">
                                    {mapPosts}
                                    <Outlet context={{posts: posts.sort((a, b) => b.uid - a.uid)}} />
                                </div>
                            </>
                        )
                        :
                        (
                            < div className="min-h-[15rem]">
                                <div className="flex flex-col justify-center items-center pt-14 pr-8">
                                    <div>
                                        <img className="h-7 mb-10" src={process.env.PUBLIC_URL + "/images/camera-icon.png"} alt="camera" />
                                    </div>
                                    <div>
                                        <p className="text-3xl font-light" >No Posts Yet</p>
                                    </div>
                                </div>
                            </div>
                        )

                )
                :
                (
                    userRedux.posts.length > 0 ?
                        (
                            <>
                                <div className="grid sm:gap-3 lg:gap-7 gap-1 grid-cols-3 grid-cols-3 auto-cols-[300px] auto-rows-auto mt-3">
                                    {mapPosts}
                                    <Outlet context={{posts: posts.sort((a, b) => b.uid - a.uid)}} />
                                </div>
                            </>
                        )
                        :
                        (
                            <div className="flex">
                                <img className="max-h-96 h-hull" src="/images/in-profile-some.jpg" alt="happy-people"></img>
                                <div className="bg-white w-full flex flex-col items-center justify-center">
                                    <p className="text-lg font-semibold">Start capturing and sharing your moments.</p>
                                    <p className="text-base">Get the app to share your first photo or video.</p>
                                    <div className="flex justify-center mt-5">
                                        <a target="_blank" href="https://apps.apple.com/app/instagram/id389801252?vt=li">
                                            <img className="h-10 mr-2" src="/images/in-profile-download-app-store.png" alt="download-app-store"></img>
                                        </a>
                                        <a target="_blank" href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DprofilePage%26ig_mid%3D2788DF8E-C489-435D-91E7-AE0C0CD96509%26utm_content%3Dli%26utm_medium%3Dbadge">
                                            <img className="h-10" src="/images/in-profile-download-google-play.png" alt="doswload-app-google-play"></img>
                                        </a>
                                    </div>
                                </div>
                            </div >
                        )

                )
            }
        </>

    )
}

export default React.memo(Posts)