import React from "react";
import { useSelector } from "react-redux";

const Tagged = () => {

    const userRedux = useSelector((state) => state.userReducer.user)
    const currentProfileUser = useSelector((state) => state.currentProfileUserReducer.user)
    const isUserOnStrangeProfile = userRedux.uid !== currentProfileUser.uid
    
    return (
        <>
            {isUserOnStrangeProfile ?
                (
                    <div className="min-h-[15rem]">
                        <div className="flex flex-col justify-center items-center pt-14 pr-8">
                            <div>
                                <img className="h-7 mb-10" src="/images/camera-icon.png" />
                            </div>
                            <div>
                                <p className="text-3xl font-light" >No Posts Yet</p>
                            </div>
                        </div>
                    </div>
                )
                :
                (
                    <div className="flex">
                        <img className="h-96" src="/images/in-profile-some.jpg"></img>
                        <div className="bg-white w-full flex flex-col items-center justify-center">
                            <p className="text-lg font-semibold">Take photos and videos of interesting moments and share them</p>
                            <p className="text-base">Download the app to share your first photo or video.</p>
                            <div className="flex justify-center mt-5">
                                <a target="_blank" href="https://apps.apple.com/app/instagram/id389801252?vt=li">
                                    <img className="h-10 mr-2" src="/images/in-profile-download-app-store.png"></img>
                                </a>
                                <a target="_blank" href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DprofilePage%26ig_mid%3D2788DF8E-C489-435D-91E7-AE0C0CD96509%26utm_content%3Dli%26utm_medium%3Dbadge">
                                    <img className="h-10" src="/images/in-profile-download-google-play.png"></img>
                                </a>
                            </div>
                        </div>
                    </div>
                )
            }
        </>

    )
}

export default Tagged