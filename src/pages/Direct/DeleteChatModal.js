import React, { useContext } from "react";
import ReusebleModal from "../../components/ReusebleModal";
import { Navigate, useParams } from "react-router-dom";
import { Context } from "../../context/firebaseContext";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setChats } from "../../redux/actions/chatsAction";

const DeleteChatModal = ({ activeModal, setActiveModal }) => {

    const { chat } = useParams()
    const { doc, db, deleteDoc } = useContext(Context)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const chatsRedux = useSelector((state) => state.chatsReducer)

    const deleteChat = async () => {

        const newArray = chatsRedux.filter(elem => elem.uid !== chat)
        console.log(newArray)
        dispatch(setChats(newArray))

        const chatRef = doc(db, 'chats', `${chat}`)
        await deleteDoc(chatRef)



        navigate(`/direct`)

    }
    return (
        <ReusebleModal
            activeModal={activeModal}
            setActiveModal={setActiveModal}
            styleForContainerBlock='fixed w-screen h-screen top-0 left-0 right-0 flex justify-center items-center z-20 cursor-default bg-black/60 duration-300'
        >
            <div className={`w-[400px] bg-white rounded-xl duration-300 ${activeModal ? 'opacity-1 scale-100' : 'opacity-0 scale-50'}`} onClick={(e) => e.stopPropagation()}>
                <div className={`flex flex-col items-center`}>
                    <p className="font-semibold text-center text-lg mt-7">Delete Chat</p>
                    <p className="text-center text-sm mt-3 text-gray-500 max-w-[300px]">Deleting removes the chat from your inbox, but no one else's inbox.</p>
                    <button onClick={deleteChat} type='button' className="text-sm text-red-500 font-bold w-full py-3 border-t mt-5">Delete</button>
                    <button onClick={() => setActiveModal(false)} type='button' className="text-sm w-full py-3 border-t">Cancel</button>
                </div>
            </div>
        </ReusebleModal>
    )
}

export default DeleteChatModal