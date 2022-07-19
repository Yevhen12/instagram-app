import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from '../../../../../constants/pagesLinks'
import { useSelector } from "react-redux";
import useFollow from "../../../../../hooks/useFollow";
import UnfollowModal from "../../../../../components/Modals/UnfollowModal";
import ReusebleModal from "../../../../../components/Modals/ReusebleModal";

const UserSuggestion = ({ displayName, name, uid, imageUrl }) => {

    const [activeModal, setActiveModal] = useState(false)
    const { hendleFollow } = useFollow({ displayName, uid, imageUrl, name })
    const userRedux = useSelector(state => state.userReducer.user)

    const isUserFollowing = userRedux.following && userRedux.following.find(elem => elem.displayName === displayName)


    return (
        <div className="flex justify-between items-center w-full my-2">
            <Link to={ROUTES.HOME + displayName}>
                <div className="rounded-full w-[32px] mr-3">
                    <img alt="userImage" src={`${imageUrl ? imageUrl : '/images/standart-profile.png'}`} className='h-[32px] object-cover' />
                </div>
            </Link>
            <div className="flex flex-col w-full">
                <Link to={ROUTES.HOME + displayName}>
                    <p className="text-sm font-semibold ">{displayName}</p>
                </Link>
                <p className="text-[10px] text-gray-500/80 tracking-wide">Suggested for you</p>
            </div>

            {
                isUserFollowing ?
                    (
                        <>
                            <button type="button" onClick={() => setActiveModal(true)} className="active:opacity-60 text-xs font-semibold px-3">Following</button>
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
                        </>

                    )
                    :
                    (
                        <button type="button" onClick={() => hendleFollow()} className='active:opacity-60 text-xs text-[#0195f6] font-semibold px-3'>Follow</button>
                    )
            }

        </div>
    )
}

export default UserSuggestion