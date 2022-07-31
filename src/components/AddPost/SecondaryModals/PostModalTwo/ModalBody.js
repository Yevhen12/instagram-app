import React, { useCallback, useState, useMemo } from "react";
import EmojiModal from "../../../EmojiModal/EmojiModal";
import { useSelector } from "react-redux";

const ModalBody = ({ post, setText, text }) => {
    const userRedux = useSelector(state => state.userReducer.user)
    const [showPicker, setShowPicker] = useState(false)

    const pickerStyle = {
        width: '250px',
        position: "absolute",
        top: '50px',
        left: '0px',
        zIndex: '21'
    }

    const changeText = (e) => {
        console.log(text)
        const { value } = e.target
        setText(value)
    }

    return (
        <div className="flex lg:flex-row flex-col h-[calc(100%-50px)]">
            <div className="lg:w-[700px] w-[400px] lg:h-full h-[50%]">
                <img alt='postphoto' src={URL.createObjectURL(post.images[0])} className="w-full h-full object-contain bg-black lg:rounded-bl-xl" />
            </div>
            <div className="lg:w-[calc(100%-700px)] w-full py-5 lg:h-full h-[50%]">
                <div className="flex flex-col">
                    <div className="flex">
                        <div className="overflow-hidden mr-3 pl-5">
                            <img alt="userPhoto" src={userRedux.imageUrl ? userRedux.imageUrl : process.env.PUBLIC_URL + '/images/standart-profile.png'} className="w-7 h-7 object-cover rounded-full" />
                        </div>
                        <p className="font-semibold mt-0.5">{userRedux.displayName}</p>
                    </div>
                    <textarea value={text} className="outline-none mt-5 resize-none lg:h-[170px] max-h-[100px] h-full px-5" placeholder="Write a caption..." onChange={(e) => changeText(e)}></textarea>
                    <div className="h-[50px] flex justify-between items-center border-b relative">
                        <button className="pl-5" onClick={() => setShowPicker(prevShowPicker => !prevShowPicker)}>
                            <img alt="emoji" src={process.env.PUBLIC_URL + "/images/smile-icon.png"} className="w-5 h-5 opacity-50" />
                        </button>
                        <EmojiModal
                            showPicker={showPicker}
                            setShowPicker={setShowPicker}
                            pickerStyle={pickerStyle}
                            setText={setText}
                        />
                        <p className="text-xs text-black/40 pr-5">{text.length} / 2,200</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(ModalBody)