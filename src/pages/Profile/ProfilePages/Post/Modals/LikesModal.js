import React from "react";
import Modal from "../../../../../components/Modals/Modal";
import { nanoid } from 'nanoid'
import UserInFollowersModal from "../../Modals/ItemUser/UserInFollowersModal";

const LikesModal = ({ likes, activeModal, setActiveModal }) => {

    
    const mapLikesArray= likes.map(elem => {
        return (
            <UserInFollowersModal
                key={nanoid()}
                currentUser={elem}
            />
        )
    })


    return (
        <Modal
            activeModal={activeModal}
            setActiveModal={setActiveModal}
            textTitle="Likes"
            styleBlock='bg-white w-[25rem] rounded-xl duration-300 h-[25rem]'
        >
            <ul key={nanoid()} className="flex flex-col overflow-y-auto max-h-[350px]">
                {mapLikesArray}
            </ul>

        </Modal>
    )
}

export default LikesModal