import React from "react";

const ReusebleModal = ({ children, styleForContainerBlock, styleForInnerBlock, activeModal, setActiveModal }) => {

    const hendleMenu = () => {
        setActiveModal(false)
    }
    return (
        <div onClick={() => hendleMenu()} className={`w-full h-full fixed top-0 left-0 flex justify-center items-center z-10 cursor-default 
        ${activeModal ? 'block pointer-events-auto' : 'hidden pointer-events-none'}`}>
            <div
                className={styleForContainerBlock}
                onClick = {(e) => e.stopPropagation()}
            >
                <div className={styleForInnerBlock}>
                    {children}
                </div>
            </div>
        </div>
    )
}
export default ReusebleModal