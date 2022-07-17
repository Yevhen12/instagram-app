import React from "react";
import DropMenu from "../../../DropMenu/DropMenu";
import UserSuggestItem from "../UserSuggestItem";

const ModalSuggestions = ({ usersSuggestions, setActiveModal, activeModal, redirectToAnotherUser }) => {

    const mapUsersSuggestions = usersSuggestions.map((elem) => <UserSuggestItem key={elem.uid} user={elem} redirectToAnotherUser={redirectToAnotherUser} />)

    return (
        (
            <DropMenu
                styleForWindowBlock="w-full h-full fixed top-0 left-0 flex justify-center items-center z-10 cursor-default "
                dropMenuProfile={activeModal}
                setDropMenuProfile={setActiveModal}
                styleForContainerBlock={`absolute w-[23.4rem] h-[22.6rem] shadow-defaultModal rounded bg-white flex top-14 right-3 p-0 m-0 z-20`}
                styleForInnerBlock='flex flex-col w-full overflow-y-scroll'
            >
                {
                    mapUsersSuggestions.length > 0 ?
                        (
                            <ul className="pt-3">
                                {mapUsersSuggestions}
                            </ul>
                        )
                        :
                        (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-sm text-gray-400">No results found.</p>
                            </div>
                        )
                }
            </DropMenu>
        )
    )
}

export default ModalSuggestions