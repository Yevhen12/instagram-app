import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import * as ProfileRoutes from '../../constants/profileLinks'
import NotFound from "../NotFound";
import ReusebleModal from "../../components/ReusebleModal";
import UnfollowModal from "../../components/UnfollowModal";
import useFollow from "../../hooks/useFollow";

const StrangeProfileUser = () => {
    const currentProfileUserRedux = useSelector((state) => state.currentProfileUserReducer.user)
    const userRedux = useSelector((state) => state.userReducer.user)
    const [activeModal, setActiveModal] = useState(false)
    

    //console.log(currentProfileUserRedux)
    const location = useLocation()
    const {imageUrl, name, uid, displayName} = currentProfileUserRedux
    const { hendleFollow } = useFollow({imageUrl, name, uid, displayName})
    const addToFollowing = () => {
        setActiveModal(false)
        hendleFollow()
    }
    console.log(currentProfileUserRedux)

    const isUserReduxFollowing = currentProfileUserRedux.followers && currentProfileUserRedux.followers.find(elem => elem.uid === userRedux.uid)



    return (
        <>
            {
                currentProfileUserRedux.displayName ?
                    (
                        <section className="flex justify-center">
                            <div className="container max-w-5xl mt-7 relative pl-5 pr-5 flex flex-col">
                                <div className="flex mb-10">
                                    <div className="max-w-[18rem] w-full min-w-[12rem] flex justify-center mr-5">
                                        <div className="w-36 h-36 rounded-full border overflow-hidden">
                                            <img
                                                className="w-full h-full object-cover "
                                                src={`${currentProfileUserRedux.imageUrl ? currentProfileUserRedux.imageUrl : '/images/standart-profile.png'}`}
                                                alt="profilePhoto"
                                            ></img>
                                        </div>

                                    </div>
                                    <div className="w-full">
                                        <div className="flex items-center mb-8">
                                            <p className="font-thin text-3xl mr-7 mt-0 pt-0 mb-1">{currentProfileUserRedux.displayName}</p>
                                            {
                                                isUserReduxFollowing ?
                                                    (
                                                        <>
                                                            <button
                                                                className="active:opacity-60 border rounded rounded-[0.15] px-2.5 py-1.5 text-sm font-semibold mr-2 bg-transparent text-black "
                                                                type="button"
                                                            >
                                                                Message
                                                            </button>
                                                            <button
                                                                className="active:opacity-60 border rounded rounded-[0.15] px-[1.6rem] py-1.5 text-sm font-semibold mr-2 bg-transparent text-black "
                                                                type="button"
                                                                onClick={() => setActiveModal(true)}
                                                            >
                                                                <img className="w-5 h-5" src="/images/checked-user.png" alt="checked-user" />
                                                            </button>
                                                            <ReusebleModal
                                                                activeModal={activeModal}
                                                                setActiveModal={setActiveModal}
                                                            >
                                                                <UnfollowModal
                                                                    activeModal={activeModal}
                                                                    imageUrl={currentProfileUserRedux.imageUrl}
                                                                    displayName={currentProfileUserRedux.displayName}
                                                                    setActiveModal={setActiveModal}
                                                                />
                                                            </ReusebleModal>
                                                            <button className="border rounded rounded-[0.15] px-3 py-2.5 text-sm font-semibold mr-5 bg-transparent text-black active:opacity-60" type="button">
                                                                <img className="h-3" src="/images/arrow-down-gray.png" alt="arrow"></img>
                                                            </button>
                                                            <div className="h-6 w-6">
                                                                <img src="/images/option-icon.png" alt="options"></img>
                                                            </div>
                                                        </>

                                                    ) :
                                                    (
                                                        <>
                                                            <button
                                                                className="active:opacity-60 rounded rounded-[0.15] px-6 py-1.5 text-sm font-semibold mr-2 bg-[#0195f6] text-white "
                                                                type="button"
                                                                onClick={addToFollowing}
                                                            >
                                                                Follow
                                                            </button>
                                                            <button className="active:opacity-60 rounded rounded-[0.15] px-3 py-2.5 text-sm font-semibold mr-5 bg-[#0195f6] text-white" type="button">
                                                                <img className="h-3" src="/images/down-arrow-white.png" alt="arrow"></img>
                                                            </button>
                                                            <div className="h-6 w-6">
                                                                <img src="/images/option-icon.png" alt="options"></img>
                                                            </div>
                                                        </>
                                                    )
                                            }
                                        </div>
                                        <div className="flex items-center">
                                            <div className="mr-10">
                                                <p><span className="font-semibold">0 </span>posts</p>
                                            </div>
                                            <div className="mr-10">
                                                <Link to={`${ProfileRoutes.FOLLOWERS}`}>
                                                    <p className="cursor-pointer"><span className="font-semibold">{currentProfileUserRedux.followers.length}</span> followers</p>
                                                </Link>
                                            </div>
                                            <div className="mr-10">
                                                <p className="cursor-pointer"><span className="font-semibold">{currentProfileUserRedux.following.length}</span> following</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="border-t w-full flex justify-center">

                                    <div
                                        className={`mr-14 opacity-50 border-t active:opacity-25 ${location.pathname === '/' + currentProfileUserRedux.displayName ? 'border-black opacity-100' : 'border-transparent'}`}
                                        data-name="posts"
                                    >
                                        <Link to={`${ProfileRoutes.POSTS}`}>
                                            <div className="h-12 flex justify-between items-center">
                                                <img className="h-3 mr-2" src="/images/grid-icon.png" alt="grid" />
                                                <p className="text-xs tracking-widest font-medium">POSTS</p>
                                            </div>
                                        </Link>
                                    </div>
                                    <div
                                        className={`mr-14 opacity-50 border-t active:opacity-25 ${location.pathname === '/' + currentProfileUserRedux.displayName + '/tagged' ? 'border-black opacity-100' : 'border-transparent'}`}
                                        data-name="tagged"
                                    >
                                        <Link to={`${ProfileRoutes.TAGGED}`}>
                                            <div className="h-12 flex justify-between items-center">
                                                <img className="h-3 mr-2" src="/images/mark-profile-icon.png" alt="profile" />
                                                <p className="text-xs tracking-widest font-medium">TAGGED</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <Outlet />
                            </div>
                        </section >
                    )
                    :
                    <NotFound />
            }
        </>
    )
}

export default StrangeProfileUser