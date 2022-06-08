import React from "react";

const DropMenu = ({ children, styleForContainerBlock, styleForInnerBlock, dropMenuProfile, setDropMenuProfile }) => {

    const hendleMenu = () => {
        setDropMenuProfile(false)
    }
    return (
        <div onClick={() => hendleMenu()} className={`w-full h-full fixed top-0 left-0 flex justify-center items-center z-10 cursor-default 
        ${dropMenuProfile ? 'block pointer-events-auto' : 'hidden pointer-events-none'}`}>
            <div
                className={styleForContainerBlock}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styleForInnerBlock}>
                    {children}
                </div>
            </div>
        </div>
    )
}
export default DropMenu