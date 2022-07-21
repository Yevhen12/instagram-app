import React, {useState} from "react";
import ModalSharePost from "../../Modals/ModalSharePost";

const SharePost = ({updatedCurrentPost}) => {

    const [activeSharePost, setActiveSharePost] = useState(false)

    return (
        <>
            <img alt="send" src="/images/send-message-icon.png" className="h-[22px] w-[22px] cursor-pointer hover:opacity-50" onClick={() => setActiveSharePost(true)} />
            <ModalSharePost
                activeModal={activeSharePost}
                setActiveModal={setActiveSharePost}
                updatedCurrentPost={updatedCurrentPost}
            />
        </>
    )
}

export default SharePost