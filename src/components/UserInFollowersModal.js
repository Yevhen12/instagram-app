import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useFollow from "../hooks/useFollow";
import ReusebleModal from "./ReusebleModal";
import UnfollowModal from "./UnfollowModal";
import Modal from "./Modal";

const UserInFollowersModal = ({ currentUser }) => {

    const [activeModal, setActiveModal] = useState(false)
    const userRedux = useSelector((state) => state.userReducer.user)
    const { imageUrl, name, displayName, uid } = currentUser
    const { hendleFollow } = useFollow({ imageUrl, name, displayName, uid })
    const isUserReduxFollowing = userRedux.following && userRedux.following.find(elem => elem.displayName === currentUser.displayName)

    return (
        <li className="pt-2.5 px-5">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <div className="h-[2.1rem] w-[2.1rem] rounded-full border overflow-hidden mt-1">
                        <img
                            className="w-full h-full object-cover"
                            src={`${imageUrl ? imageUrl : '/images/standart-profile.png'}`}
                            alt="UserPhoto"
                        />
                    </div>
                    <div className="flex flex-col ml-2">
                        <span className="text-sm font-semibold">{displayName}</span>
                        <span className="text-sm">{name}</span>
                    </div>
                </div>
                {
                    currentUser.uid !== userRedux.uid &&
                    (
                        isUserReduxFollowing ?
                            (
                                <div>
                                    <button onClick={() => setActiveModal(true)} className="border rounded rounded-[0.15] px-3 py-1 text-sm font-semibold bg-transparent text-black active:opacity-60">Following</button>
                                    <ReusebleModal
                                        activeModal={activeModal}
                                        setActiveModal={setActiveModal}
                                        styleForContainerBlock='fixed w-screen h-screen top-0 left-0 right-0 flex justify-center items-center z-10 cursor-default bg-black/60 duration-300'
                                    >
                                        <UnfollowModal
                                            activeModal={activeModal}
                                            imageUrl={imageUrl}
                                            displayName={displayName}
                                            name={name}
                                            uid={uid}
                                            setActiveModal={setActiveModal}
                                        />
                                    </ReusebleModal>
                                </div>
                            )
                            :
                            (
                                <div>
                                    <button onClick={() => hendleFollow()} className="active:opacity-60 rounded rounded-[0.15] px-3 py-1 text-sm font-semibold bg-[#0195f6] text-white">Follow</button>
                                </div>
                            )
                    )
                }
            </div>
        </li>
    )
}
export default UserInFollowersModal