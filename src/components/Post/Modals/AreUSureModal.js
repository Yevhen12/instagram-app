import React from "react";
import ReusebleModal from "../../ReusebleModal";

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