import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import * as ProfileRoutes from '../../constants/profileLinks'

const StrangeProfileUser = () => {
    const currentProfileUser = useSelector((state) => state.currentProfileUserReducer.user)
    const location = useLocation()

    return (
        <section className="flex justify-center">
            <div className="container max-w-5xl mt-7 relative pl-5 pr-5 flex flex-col">
                <div className="flex mb-10">
                    <div className="max-w-[18rem] w-full min-w-[12rem] flex justify-center mr-5">
                        <div className="w-36 h-36 rounded-full border overflow-hidden">
                            <img className="w-full h-full object-cover " src={`${currentProfileUser.imageUrl ? currentProfileUser.imageUrl : '/images/standart-profile.png'}`}></img>
                        </div>

                    </div>
                    <div className="w-full">
                        <div className="flex items-center mb-8">
                            <p className="font-thin text-3xl mr-7 mt-0 pt-0">{currentProfileUser.displayName}</p>
                            <button className="rounded rounded-[0.15] px-6 py-1.5 text-sm font-semibold mr-2 bg-[#0195f6] text-white " type="button">Follow</button>
                            <button className="rounded rounded-[0.15] px-3 py-2.5 text-sm font-semibold mr-5 bg-[#0195f6] text-white" type="button">
                                <img className="h-3" src="/images/down-arrow-white.png"></img>
                            </button>
                            <div className="h-6 w-6">
                                <img src="/images/option-icon.png"></img>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <p className="mr-10"><span className="font-semibold">0 </span>posts</p>
                            <p className="mr-10"><span className="font-semibold">0</span> followers</p>
                            <p><span className="font-semibold">0</span> following</p>
                        </div>

                    </div>
                </div>
                <div className="border-t w-full flex justify-center">

                    <div
                        className={`mr-14 opacity-50 border-t active:opacity-25 ${location.pathname === '/' + currentProfileUser.displayName ? 'border-black opacity-100' : 'border-transparent'}`}
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
                        className={`mr-14 opacity-50 border-t active:opacity-25 ${location.pathname === '/' + currentProfileUser.displayName + '/tagged' ? 'border-black opacity-100' : 'border-transparent'}`}
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
    )
}

export default StrangeProfileUser