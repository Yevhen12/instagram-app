import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";

const Posts = () => {
    const [posts, setPosts] = useState([])
    const userRedux = useSelector((state) => state.userReducer.user)
    const currentProfileUserRedux = useSelector((state) => state.currentProfileUserReducer.user)
    const isUserOnStrangeProfile = userRedux.uid !== currentProfileUserRedux.uid

    useEffect(() => {
        setPosts(currentProfileUserRedux.posts)
    }, [currentProfileUserRedux.posts, userRedux.posts])


    const mapPosts = posts.sort((a, b) => {
        if(b.uid && a.uid) return b.uid - a.uid

        return a || b
        
    }).map(elem => <Post key={elem.uid} post={elem} />)

    return (
        <>
            {isUserOnStrangeProfile ?
                (
                    currentProfileUserRedux.posts.length > 0 ?
                        (
                            <>
                                <div className="flex flex-wrap">
                                    {mapPosts}
                                </div>
                            </>
                        )
                        :
                        (
                            < div className="min-h-[15rem]">
                                <div className="flex flex-col justify-center items-center pt-14 pr-8">
                                    <div>
                                        <img className="h-7 mb-10" src="/images/camera-icon.png" alt="camera" />
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
                                <div className="flex flex-wrap">
                                    {mapPosts}
                                </div>
                            </>
                        )
                        :
                        (
                            <div className="flex">
                                <img className="h-96" src="/images/in-profile-some.jpg" alt="happy-people"></img>
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

export default Posts