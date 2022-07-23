import React, { useState } from "react";
import { Link } from "react-router-dom";
import convertUnixTime from "../../../../../../../helpers/converUnixTime";
import { useSelector } from "react-redux";
import UnfollowModal from "../../../../../../Modals/UnfollowModal";
import useFollow from '../../../../../../../hooks/useFollow'
import ReusebleModal from "../../../../../../Modals/ReusebleModal";

const FollowerItem = ({ activity }) => {
    const [activeModal, setActiveModal] = useState(false)
    const { displayName, name, uid, imageUrl } = activity
    const userRedux = useSelector(state => state.userReducer.user)
    const { hendleFollow } = useFollow({ displayName, uid, imageUrl, name })

    const isUserFollowing = userRedux.following && userRedux.following.find(elem => elem.displayName === displayName)

    let currentTimeString = 'Now';
    currentTimeString = convertUnixTime(activity.createdAt).split(' ')
    if (currentTimeString[1] === 'Now') {
        currentTimeString = 'Now'
    } else {
        currentTimeString = currentTimeString[0] + currentTimeString[1][0]
    }

    return (
        <div className="flex items-center my-3">
            <Link to={`/${activity.displayName}`}>
                <div className="overflow-hidden rounded-full w-[44px] h-[44px] mr-3">
                    <img alt="userPhoto" src={`${activity.imageUrl ? activity.imageUrl : '/images/standart-profile.png'}`} className='w-full h-full object-cover' />
                </div>
            </Link>
            <div className="w-full flex">
                <Link to={`/${activity.displayName}`}>
                    <p className="font-semibold text-sm mr-2">{activity.displayName}</p>
                </Link>
                <p className="text-sm mr-1">started following you.</p>
                <p className="text-sm text-gray-500/70">{currentTimeString}</p>
            </div>
            {
                isUserFollowing ?
                    (
                        <>
                            <button type="button" onClick={() => setActiveModal(true)} className="active:opacity-60 text-sm font-semibold border px-3.5 py-1">Following</button>
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
                        <button type="button" onClick={() => hendleFollow()} className='active:opacity-60 text-white text-sm px-6 py-1.5 bg-[#0195f6] rounded font-semibold'>Follow</button>
                    )
            }
        </div>
    )
}

export default FollowerItem