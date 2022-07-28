import React from "react";
import Modal from "./Modal";
import { useSelector } from "react-redux";

const SwitchModal = ({ activeModal, setActiveModal }) => {
    const userRedux = useSelector(state => state.userReducer.user)

    const openLogIn = () => {
        console.log(1)
    }
    return (
        <Modal
            activeModal={activeModal}
            setActiveModal={setActiveModal}
            textTitle="Switch accounts"
            styleBlock='bg-white w-[400px] rounded-xl duration-300'
        >
            <div className="flex flex-row px-5 py-3 justify-between items-center border-b ">
                <div className="flex items-center">
                    <img className="w-[56px] h-[56px] rounded-full object-cover mr-3" alt="userPhoto" src={userRedux.imageUrl ? userRedux.imageUrl : '/images/standart-profile.png'} />
                    <p className="font-semibold text-sm">{userRedux.displayName}</p>
                </div>
                <div className="relative">
                    <img src={`/images/circle-full-blue-icon.png`} className='h-6 w-6 ml-5' />
                    <img src='/images/check-white-icon.png' className='absolute h-5 w-5 top-0.5 right-0.5' />
                </div>
            </div>
            <div className="flex justify-center">
                <button className="text-sm text-[#0195f6] h-[50px] font-semibold" type="button" onClick={openLogIn}>
                    Log into an Existing Account
                </button>
            </div>
        </Modal>
    )
}

export default SwitchModal