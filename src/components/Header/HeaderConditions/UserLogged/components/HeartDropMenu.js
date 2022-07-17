import React from "react";
import DropMenu from "../../../../DropMenu/DropMenu";

const HeartDropMenu = ({dropMenuHeart, setDropMenuHeart}) => {
    return (
        <DropMenu
            styleForWindowBlock="w-full h-full fixed top-0 left-0 flex justify-center items-center z-20 cursor-default "
            styleForContainerBlock={`absolute w-[32rem] h-[23rem] shadow-defaultModal rounded bg-white flex items-center top-10 -right-10 p-0 m-0 z-30 cursor-pointer`}
            styleForInnerBlock='flex items-center flex-col w-full'
            dropMenuProfile={dropMenuHeart}
            setDropMenuProfile={setDropMenuHeart}

        >
            <div className="flex items-center justify-center flex-col">
                <img className="h-10 opacity-30" src="/images/search-icon.png" alt="search"></img>
                <p className="text-sm mt-2 italic text-gray-400">No info yet</p>
            </div>
        </DropMenu>
    )
}

export default HeartDropMenu