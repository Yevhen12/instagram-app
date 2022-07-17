import React, { useState } from "react";
import AreUSureModal from "../AddPost/SecondaryModals/AreUSureModal";

const ReusebleModal = ({ children, activeModal, setActiveModal, styleForContainerBlock, closeModal }) => {

    const hendleMenu = (e) => {
        setActiveModal && setActiveModal(false)
        closeModal && closeModal()
        e.stopPropagation()

    }

    return (
        <div onClick={(e) => hendleMenu(e)} className={`${styleForContainerBlock} 
        ${activeModal ? ' opacity-1 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            {children}
        </div>
    )
}
export default ReusebleModal