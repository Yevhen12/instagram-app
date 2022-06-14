import React, { useState, useMemo } from "react";
import Modal from "../../components/Modal";
import { useSelector } from "react-redux";
import { nanoid } from 'nanoid'
import UserInFollowersModal from "../../components/UserInFollowersModal";

const Followers = () => {
    const [activeModal, setActiveModal] = useState(true)
    const currentProfileUserRedux = useSelector((state) => state.currentProfileUserReducer.user)
    console.log(currentProfileUserRedux)
    const mapFollowersArray = currentProfileUserRedux.followers.map(elem => {
        return (
            <UserInFollowersModal
                key={nanoid()}
                currentUser={elem}
            />
        )
    })



    return (
        <ul>
            <Modal
                activeModal={activeModal}
                setActiveModal={setActiveModal}
                textTitle="Followers"
                nav={-1}
                styleBlock = 'bg-white w-[25rem] rounded-xl duration-300 h-[25rem]'
            >
                <div key={nanoid()} className="flex flex-col">
                    {mapFollowersArray}
                </div>

            </Modal>
        </ul>
    )
}

export default Followers