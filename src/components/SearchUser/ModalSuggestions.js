import React from "react";

const ModalSuggestions = ({ children, activeModal, setActiveModal }) => {

    const hendleMenu = () => {
        setActiveModal(false)
    }
    return (
        <div onClick={hendleMenu} className={`fixed w-screen h-screen top-0 left-0 right-0 flex justify-center items-center z-10 cursor-default
        ${activeModal ? 'pointer-events-auto' : 'pointer-events-none'}`}>
            <div
                className = "w-96 h-96 bg-black"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}

export default ModalSuggestions