import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from '../../constants/pagesLinks'
import { useSelector } from "react-redux";
import useFollow from "../../hooks/useFollow";
import UnfollowModal from "../Modals/UnfollowModal";
import ReusebleModal from "../Modals/ReusebleModal";

const UserSuggest = ({ displayName, uid, imageUrl, name }) => {
    console.log(displayName, uid, imageUrl, name)

    const [activeModal, setActiveModal] = useState(false)
    const { hendleFollow } = useFollow({ displayName, uid, imageUrl, name })
    const userRedux = useSelector(state => state.userReducer.user)

    const isUserFollowing = userRedux.following && userRedux.following.find(elem => elem.displayName === displayName)

    return (
        <div className="flex justify-between items-center w-full px-5 py-1.5">
            <Link to={ROUTES.HOME + displayName}>
                <div className="rounded-full w-[44px] mr-4 overflow-hidden">
                    <img alt="userImage" src={`${imageUrl ? imageUrl : process.env.PUBLIC_URL + '/images/standart-profile.png'}`} className='h-[44px] object-cover' />
                </div>
            </Link>
            <div className="flex flex-col w-full">
                <Link to={ROUTES.HOME + displayName}>
                    <p className="text-sm font-semibold ">{displayName}</p>
                </Link>
                <p className="text-sm text-gray-500/80">{name}</p>
                <p className="text-[10px] text-gray-500/80">Suggested for you</p>
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

export default React.memo(UserSuggest)