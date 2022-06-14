import React from "react";

const ReusebleModal = ({ children, activeModal, setActiveModal }) => {

    const hendleMenu = () => {
        setActiveModal(false)
    }
    return (
        <div onClick={() => hendleMenu()} className={`w-full h-full fixed top-0 left-0 flex justify-center items-center z-10 cursor-default bg-black/60 duration-300
        ${activeModal ? 'opacity-1 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            {children}
        </div>
    )
}
export default ReusebleModal