import React from "react";
import { useSelector } from "react-redux";
import useFollow from "../hooks/useFollow";

const UserInFollowersModal = ({ currentUser }) => {
    const userRedux = useSelector((state) => state.userReducer.user)
    const { imageUrl, name, displayName, uid } = currentUser
    const { hendleFollow } = useFollow({ imageUrl, name, displayName, uid })
    const isUserReduxFollowing = userRedux.following && userRedux.following.find(elem => elem.displayName === currentUser.displayName)
    console.log(currentUser)



    return (
        <li className="py-3 px-5">
            <div className="flex flex-row">
                <div className="flex">
                    <div className="h-[1.85rem] w-[1.85rem] rounded-full border overflow-hidden">
                        <img
                            className="w-full h-full object-cover"
                            src={`${currentUser.imageUrl ? currentUser.imageUrl : '/images/standart-profile.png'}`}
                            alt="UserPhoto"
                        />
                    </div>
                    <div className="w-full">
                        <p className="w-full">{currentUser.displayName}</p>
                    </div>
                </div>
                {isUserReduxFollowing ?
                    (
                        <button onClick={() => hendleFollow()} className = "border rounded rounded-[0.15] px-3 py-1 text-sm font-semibold mr-5 bg-transparent text-black active:opacity-60">Following</button>
                    ) :
                    (
                        <button onClick={() => hendleFollow()} className = "active:opacity-60 rounded rounded-[0.15] px-3 py-1 text-sm font-semibold mr-2 bg-[#0195f6] text-white">Follow</button>
                    )
                }
            </div>
        </li>
    )
}
export default UserInFollowersModal