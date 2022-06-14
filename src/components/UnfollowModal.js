import React from "react";
import useFollow from "../hooks/useFollow";

const UnfollowModal = ({ imageUrl, displayName, activeModal, setActiveModal, name, uid }) => {

    const hendleMenu = () => {
        setActiveModal(false)
    }
    const { hendleFollow } = useFollow({name, uid, displayName, imageUrl, name, uid})
    const unfollowFunction = () => {
        hendleMenu()
        hendleFollow()
    }

    return (
        <div onClick={(e) => e.stopPropagation()} className={`bg-white w-[25rem] rounded-xl duration-300 ${activeModal ? 'scale-100' : 'scale-50'}`}>
            <div className="flex flex-col justify-center items-center">
                <div className="w-[5.5rem] h-[5.5rem] rounded-full border overflow-hidden my-8">
                    <img
                        className="w-full h-full object-cover"
                        src={`${imageUrl ? imageUrl : '/images/standart-profile.png'}`}
                        alt="profilePhoto"
                    ></img>
                </div>
                <p className="mb-5 text-sm">Unfollow @{displayName}?</p>
                <div className="w-full border-t h-12 flex itens-center justify-center active:bg-gray-100">
                    <button onClick={unfollowFunction} className="text-sm text-red-500 font-bold w-full">Unfollow</button>
                </div>
                <div className="w-full border-t h-12 flex itens-center justify-center active:bg-gray-100 rounded-b-xl">
                    <button onClick={hendleMenu} className="text-sm w-full">Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default UnfollowModal