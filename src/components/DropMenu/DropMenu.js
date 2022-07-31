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
                className={`${styleForContainerBlock} duration-200 ${dropMenuProfile ? 'opacity-1 top-12 pointer-events-auto' : 'opacity-0 top-6 pointer-events-none'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styleForInnerBlock}>
                    {children}
                </div>
            </div>
        </>
    )
}
export default React.memo(DropMenu)