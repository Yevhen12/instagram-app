import React from "react";
import { useNavigate } from "react-router-dom";

const Modal = ({ children, activeModal, setActiveModal, textTitle, nav, styleBlock }) => {

    const navigate = useNavigate()
    const closeModal = () => {
        setActiveModal(false)
        if(nav) navigate(nav)
    }

    return (
        <div
            onClick={closeModal}
            className={`w-full h-full bg-black/60 fixed top-0 left-0 flex justify-center items-center z-10 duration-300 ${activeModal ? 'opacity-1 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`${styleBlock} ${activeModal ? 'scale-100' : 'scale-50'}`}
            >
                <div className={`w-full border-b relative`}>
                    <p className="text-center font-semibold p-2">{textTitle}</p>
                    <img
                        src="/images/close-icon.png"
                        className="h-4 absolute top-3 right-3 cursor-pointer"
                        onClick={closeModal}
                        alt="close"
                    >

                    </img>

                </div>

                {children}
            </div>
        </div>
    )
}

export default Modal