import React, { useState } from "react";
import ModalChangePicture from "../../../components/Modals/ModalChangePicture";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import * as ProfileRoutes from '../../../constants/profileLinks'
import Loading from "../../../components/Loaders/Loaging";

const RealUser = () => {
    const [activeModal, setActiveModal] = useState(false)
    const userRedux = useSelector((state) => state.userReducer.user)
    const location = useLocation()
    const [isLoading, setIsLoading] = useState(false)


    // useEffect(() => {
    //     const getUser = async () => {
    //         const userRef = doc(db, 'users', userRedux.uid)
    //         const userSnap = await getDoc(userRef)

    //         dispatch(setUser(userSnap.data()))
    //     }

    //     getUser()

    // }, [user])

    console.log(location)

    const hendleActiveModal = () => {
        setActiveModal(true)
    }

    return (
        <>
            {
                userRedux.displayName &&
                <section className="flex justify-center">
                    <div className="container max-w-5xl mt-7 relative pl-5 pr-5 flex flex-col">
                        <div className="w-full flex mb-10 md:flex-row flex-col justify-center">
                            <div className="md:max-w-[18rem] w-full md:min-w-[12rem] flex justify-center mr-5 mb-5">
                                <button
                                    className="rounded-full border overflow-hidden"
                                    onClick={hendleActiveModal}
                                >
                                    <div className="w-36 h-36 relative">
                                        <img className={`w-full h-full object-cover ${isLoading && 'opacity-45'}`}src={`${userRedux.imageUrl ? userRedux.imageUrl : process.env.PUBLIC_URL + '/images/standart-profile.png'}`} />
                                        {isLoading && <div className="absolute top-16 left-16" ><Loading height={23} width={23} /></div>}
                                    </div>
                                </button>
                                <ModalChangePicture
                                    activeModal={activeModal}
                                    setActiveModal={setActiveModal}
                                    setIsLoading={setIsLoading}

                                />
                            </div>
                            <div className="w-full flex flex-col md:items-start items-center">
                                <div className="flex items-start mb-8">
                                    <p className="font-thin text-3xl mr-5 ">{userRedux.displayName}</p>
                                    <button className="rounded border px-2.5 py-1 text-sm font-semibold mr-5" type="button">Edit profile</button>
                                    <div className="h-6 w-6">
                                        <img src={process.env.PUBLIC_URL + "/images/settings-icon.png"}></img>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <p className="mr-10"><span className="font-semibold">{userRedux.posts.length}</span> posts</p>
                                    <Link to={`${ProfileRoutes.FOLLOWERS}`}>
                                        <p className="font-semibold mr-10">{userRedux.followers.length}<span className="font-normal"> followers</span></p>
                                    </Link>
                                    <Link to={`${ProfileRoutes.FOLLOWING}`}>
                                        <p className="font-semibold">{userRedux.following.length}<span className="font-normal"> following</span></p>
                                    </Link>
                                </div>

                            </div>
                        </div>
                        <div className="border-t w-full flex justify-center">
                            <div
                                className={`mr-14 opacity-50 border-t active:opacity-25 ml-14 ${location.pathname === '/' + userRedux.displayName ? 'border-black opacity-100' : 'border-transparent'}`}
                                data-name="posts"
                            >
                                <Link to={`${ProfileRoutes.POSTS}`}>
                                    <div className="h-12 flex justify-between items-center">
                                        <img className="h-3 mr-2" src={process.env.PUBLIC_URL + "/images/grid-icon.png"} />
                                        <p className="text-xs tracking-widest font-medium">POSTS</p>
                                    </div>
                                </Link>
                            </div>
                            <div
                                className={`mr-14 opacity-50 border-t active:opacity-25 ${location.pathname === '/' + userRedux.displayName + '/saved' ? 'border-black opacity-100' : 'border-transparent'}`}
                                data-name="saved"
                            >
                                <Link to={`${ProfileRoutes.SAVED}`}>
                                    <div className="h-12 flex justify-between items-center">
                                        <img className="h-3 mr-2" src={process.env.PUBLIC_URL + "/images/save-icon.png"} />
                                        <p className="text-xs tracking-widest font-medium">SAVED</p>
                                    </div>
                                </Link>
                            </div>
                            <div
                                className={`mr-14 opacity-50 border-t active:opacity-25 ${location.pathname === '/' + userRedux.displayName + '/tagged' ? 'border-black opacity-100' : 'border-transparent'}`}
                                data-name="tagged"
                            >
                                <Link to={`${ProfileRoutes.TAGGED}`}>
                                    <div className="h-12 flex justify-between items-center">
                                        <img className="h-3 mr-2" src={process.env.PUBLIC_URL + "/images/mark-profile-icon.png"} />
                                        <p className="text-xs tracking-widest font-medium">TAGGED</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <Outlet context={{ posts: userRedux.posts.sort((a, b) => b.uid - a.uid), savedPosts: userRedux.savedPosts.sort((a, b) => b.uid - a.uid) }} />
                    </div>
                </section>
            }
        </>
    )
}

export default React.memo(RealUser)