import React from "react";

const ReusebleModal = ({ children, activeModal, setActiveModal, styleForContainerBlock, closeModal }) => {

    const hendleMenu = (e) => {
        setActiveModal(false)
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