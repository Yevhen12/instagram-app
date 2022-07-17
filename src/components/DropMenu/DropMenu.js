import React from "react";

const DropMenu = ({ children, styleForContainerBlock, styleForInnerBlock, dropMenuProfile, setDropMenuProfile, styleForWindowBlock }) => {

    const hendleMenu = () => {
        setDropMenuProfile(false)
    }
    return (
        <>
            <div onClick={() => hendleMenu()} className={`${styleForWindowBlock}
        ${dropMenuProfile ? 'block pointer-events-auto' : 'hidden pointer-events-none'}`}>
            </div>
            <div
                className={`${styleForContainerBlock} ${dropMenuProfile ? 'block' : 'hidden'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styleForInnerBlock}>
                    {children}
                </div>
            </div>
        </>
    )
}
export default DropMenu