import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import DeleteChatModal from "./DeleteChatModal";


const Info = ({ setIsInfoActive, strangeChatUser }) => {
    const [activeModal, setActiveModal] = useState(false)
    const { chat } = useParams()

    return (
        <div className="w-[calc(100%-350px)] h-[100%-60px] flex flex-col ">
            <div className="w-full h-[60px] border-b">
                <div className="flex justify-between items-center h-[60px] px-10">
                    <div className="w-full">
                        <p className="font-semibold text-center">Details</p>
                    </div>
                    <div className="cursor-pointer">
                        <img className="h-6 w-6" alt="info" src='/images/info-black-icon.png' onClick={() => setIsInfoActive(false)} />
                    </div>
                </div>
                <div className="border-b pb-5">
                    <div className="mt-5 ml-4">
                        <p className="font-semibold">Members</p>
                        <Link to={`/${strangeChatUser.displayName}`}>
                            <div className="flex justify-left items-center ">
                                <div className="w-[3.5rem] h-[3.5rem] rounded-full overflow-hidden mt-5 mr-4">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={`${strangeChatUser.imageUrl ? strangeChatUser.imageUrl : '/images/standart-profile.png'}`}
                                        alt="UserPhoto"
                                    />
                                </div>
                                <p className="text-sm font-semibold mt-5">
                                    {strangeChatUser.displayName}
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col items-start border-b">
                    <button onClick={() => setActiveModal(true)} type="button" className="w-full px-5 py-3 text-red-500 text-sm text-left">Delete chat</button>
                    <button type="button" className="w-full px-5 py-3 text-red-500 text-sm text-left">Block</button>
                    <button type="button" className="w-full px-5 py-3 text-red-500 text-sm text-left">Report</button>
                    <DeleteChatModal
                        setActiveModal={setActiveModal}
                        activeModal={activeModal}
                    />
                </div>
            </div>
        </div>
    )
}

export default Info