import React, { useState } from "react";
import ModalChangePicture from "../../components/ModalChangePicture";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import * as ProfileRoutes from '../../constants/profileLinks'

const RealUser = () => {
    const [activeModal, setActiveModal] = useState(false)
    const userRedux = useSelector((state) => state.userReducer.user)
    const location = useLocation()

    const hendleActiveModal = () => {
        setActiveModal(true)
    }
    console.log(userRedux)
    return (
        <>
            {userRedux.displayName &&
                <section className="flex justify-center">
                    <div className="container max-w-5xl mt-7 relative pl-5 pr-5 flex flex-col">
                        <div className="flex mb-10">
                            <div className="max-w-[18rem] w-full min-w-[12rem] flex justify-center mr-5">
                                <button
                                    className="rounded-full border overflow-hidden"
                                    onClick={hendleActiveModal}
                                >
                                    <div className="w-36 h-36">
                                        <img className="w-full h-full object-cover " src={`${userRedux.imageUrl ? userRedux.imageUrl : '/images/standart-profile.png'}`}></img>
                                    </div>
                                </button>
                                <ModalChangePicture
                                    activeModal={activeModal}
                                    setActiveModal={setActiveModal}
                                />

                            </div>
                            <div className="w-full">
                                <div className="flex items-center mb-8">
                                    <p className="font-thin text-3xl mr-5 ">{userRedux.displayName}</p>
                                    <button className="rounded border px-2.5 py-1 text-sm font-semibold mr-5" type="button">Edit profile</button>
                                    <div className="h-6 w-6">
                                        <img src="/images/settings-icon.png"></img>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <p className="mr-10"><span className="font-semibold">0</span> posts</p>
                                    <p className="font-semibold mr-10">{userRedux.followers.length}<span className="font-normal"> followers</span></p>
                                    <p className="font-semibold">{userRedux.following.length}<span className="font-normal"> following</span></p>
                                </div>

                            </div>
                        </div>
                        <div className="border-t w-full flex justify-center">

                            <div
                                className={`mr-14 opacity-50 border-t active:opacity-25 ${location.pathname === '/' + userRedux.displayName ? 'border-black opacity-100' : 'border-transparent'}`}
                                data-name="posts"
                            >
                                <Link to={`${ProfileRoutes.POSTS}`}>
                                    <div className="h-12 flex justify-between items-center">
                                        <img className="h-3 mr-2" src="/images/grid-icon.png" />
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
                                        <img className="h-3 mr-2" src="/images/save-icon.png" />
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
                                        <img className="h-3 mr-2" src="/images/mark-profile-icon.png" />
                                        <p className="text-xs tracking-widest font-medium">TAGGED</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <Outlet />
                    </div>
                </section >
            }
        </>
    )
}

export default RealUser