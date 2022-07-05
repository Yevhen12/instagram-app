import React, { useState } from "react";
import ReusebleModal from "./ReusebleModal";
import useSearch from "../hooks/useSearch";

const NewMessageModal = ({ activeModal, setActiveModal }) => {
    const [text, setText] = useState('')
    const [usersFound, setUsersFound] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])
    const { searchUsers } = useSearch()

    const changeText = async (e) => {
        const { value } = e.target
        setText(value)
        setUsersFound(await searchUsers(value))
    }

    const mapUsersFound = usersFound.length > 0 ?
        usersFound.map((elem) => {
            return (
                <li key={elem.uid} className="py-1.5 pl-4 hover:bg-gray-100/50 cursor-pointer">
                    <div className="flex justify-start items-center">
                        <div className="w-[2.75rem] h-[2.75rem] rounded-full overflow-hidden mt-1">
                            <img
                                className="w-full h-full object-cover"
                                src={`${elem.imageUrl ? elem.imageUrl : '/images/standart-profile.png'}`}
                                alt="UserPhoto"
                            />
                        </div>
                        <div className="w-[15rem] ml-3">
                            <p className="font-semibold text-sm">
                                {elem.displayName}
                            </p>
                        </div>
                        <div>
                            <img src = {`/images/circle-contor.png`} className = 'h-6 w-6 ml-5' />
                        </div>
                    </div>
                </li>
            )
        })
        : false

    console.log(usersFound)
    return (
        <ReusebleModal
            activeModal={activeModal}
            setActiveModal={setActiveModal}
            styleForContainerBlock='fixed w-screen h-screen top-0 left-0 right-0 flex justify-center items-center z-20 cursor-default bg-black/60 duration-300'
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-white w-[400px] h-2/3 rounded-xl duration-300 ${activeModal ? 'scale-100' : 'scale-50'}`}
            >
                <div className="border-b px-4 py-2">
                    <div className="flex justify-between ">
                        <button className="h-3.5 w-3.5 mt-2" onClick={() => setActiveModal(false)}>
                            <img src="/images/close-icon.png" />
                        </button>
                        <div>
                            <p className="font-semibold">New message</p>
                        </div>
                        <button type="button" className="text-[#0195f6] font-semibold text-sm">Next</button>
                    </div>
                </div>
                <div className="flex px-4 items-center h-[55px] border-b overflow-y-scroll">
                    <p className="font-semibold mr-6">To: </p>
                    <input placeholder="Search..." className="outline-none placeholder:text-sm placeholder:text-gray-300 text-sm" value={text} onChange={(e) => changeText(e)} />
                </div>
                <div className="rounded-xl overflow-y-scroll h-[calc(100%-96px)] w-full">
                    {text.length === 0 ?
                        (
                            <div className="px-4 mt-4">
                                <p className="font-semibold text-sm">Suggested</p>
                                <p className="text-gray-500 text-sm mt-7">No account found.</p>
                            </div>
                        )
                        :
                        (
                            mapUsersFound.length > 0 ?
                                (
                                    <ul className="mt-3">
                                        {mapUsersFound}
                                    </ul>
                                )
                                :
                                (
                                    <p className="text-gray-500 text-sm mt-7">No account found.</p>
                                )
                        )
                    }
                </div>

            </div>
        </ReusebleModal>
    )
}

export default NewMessageModal