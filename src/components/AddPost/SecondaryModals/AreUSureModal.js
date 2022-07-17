import React from "react";
import ReusebleModal from "../../Modals/ReusebleModal";

const AreUSureModal = ({ activeModal, setActiveModal }) => {
    return (
        <ReusebleModal
            activeModal={activeModal}
            setActiveModal={setActiveModal}
        >
            hello
        </ReusebleModal>
    )
}

export default AreUSureModal