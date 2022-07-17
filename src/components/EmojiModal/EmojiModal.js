import React from "react";
import Picker from 'emoji-picker-react'

const EmojiModal = ({ showPicker, setShowPicker, pickerStyle, setText }) => {

    const onEmojiClick = (event, emojiObject) => {
        setText(prevText => prevText + emojiObject.emoji)
        setShowPicker(false)
    }

    return (
        <>
            {
                showPicker &&
                (
                    <>
                        <div
                            className={`w-full h-full fixed top-0 left-0 items-center z-10 ${showPicker ? 'pointer-events-auto' : 'pointer-events-none'}`}
                            onClick={() => setShowPicker(false)}
                        >
                        </div>
                        <div onClick={(e) => e.stopPropagation()} className={`${showPicker ? 'block' : 'hidden'}`}>
                            <Picker
                                onEmojiClick={onEmojiClick}
                                pickerStyle={pickerStyle}    
                            />
                        </div>
                    </>
                )
            }
        </>
    )
}

export default EmojiModal