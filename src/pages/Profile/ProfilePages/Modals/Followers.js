import React, { useState, useEffect } from "react";
import Modal from "../../../../components/Modals/Modal";
import { useSelector } from "react-redux";
import { nanoid } from 'nanoid'
import UserInFollowersModal from "./ItemUser/UserInFollowersModal";

const Followers = () => {
    const [activeModal, setActiveModal] = useState(false)
    const currentProfileUserRedux = useSelector((state) => state.currentProfileUserReducer.user)
    console.log(currentProfileUserRedux)
    const mapFollowersArray = currentProfileUserRedux.followers.length > 0 ? currentProfileUserRedux.followers.map(elem => {
        return (
            <UserInFollowersModal
                key={nanoid()}
                currentUser={elem}
            />
        )
    }) :
    (
        <div className="flex flex-col items-center justify-center h-[350px] w-full">
            <img alt="followers" src="/images/followers-profile-icon.png" className="w-24 h-24" />
            <p className="text-2xl font-thin">Followers</p>
            <p className="text-sm font-thin">You'll see all the people who follow you here.</p>
        </div>
    )

    useEffect(() => {
        setActiveModal(true)
    }, [])

    return (
        <Modal
            activeModal={activeModal}
            setActiveModal={setActiveModal}
            textTitle="Followers"
            nav={-1}
            styleBlock='bg-white w-[25rem] rounded-xl duration-300 h-[25rem]'
        >
            <ul key={nanoid()} className="flex flex-col max-h-[350px] overflow-y-auto">
                {mapFollowersArray}
            </ul>

        </Modal>
    )
}

export default Followers