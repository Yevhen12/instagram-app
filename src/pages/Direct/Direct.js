import React, { useState } from "react";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import NewMessageModal from "../../components/NewMessageModal";

const Direct = () => {
    const [activeModal, setActiveModal] = useState(false)
    const userRedux = useSelector((state) => state.userReducer.user)


    return (
        <div>
            <Header />
            <section className="flex justify-center">
                <div className="container max-w-5xl pt-3 pb-5 h-[calc(100vh-65px)] pl-6 pr-7">
                    <div className="border w-full h-full rounded bg-white flex">
                        <div className="w-[350px]">
                            <div className="h-[60px] border-b border-r">
                                <div className="h-[60px] flex justify-center items-center relative">
                                    <button type="button" className="p-2">
                                        <div className="flex">
                                            <div className="mr-1">
                                                <p className="font-semibold">{userRedux.displayName}</p>
                                            </div>
                                            <div>
                                                <img className="h-6 w-6" src="/images/down-arrow.png" />
                                            </div>
                                        </div>
                                    </button>
                                    <div className="mt-1.5 absolute top-3.5 right-3.5">
                                        <button type="button">
                                            <img src="/images/new-message-icon.png" className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[calc(100%-60px)] border-r">

                            </div>
                        </div>
                        <div className="w-[calc(100%-350px)]">
                            <div className="h-full flex items-center justify-center flex-col">
                                <div className="w-24 h-24">
                                    <img src="/images/send-message-circle-icon.png" />
                                </div>
                                <div className="mt-3">
                                    <p className="font-light text-2xl">Your Messages</p>
                                </div>
                                <div className="mt-2">
                                    <p className="font-light text-sm text-gray-500">Send private photos and messages to a friend or group.</p>
                                </div>
                                <button type="button" className="rounded bg-[#0195f6] px-2.5 py-1.5 text-sm text-white font-semibold mt-5" onClick={() => setActiveModal(true)}>
                                    Send Message
                                </button>
                                <NewMessageModal
                                    activeModal={activeModal}
                                    setActiveModal={setActiveModal}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Direct