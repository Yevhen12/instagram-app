import React, { useState, useContext } from "react";
import useSearch from "../../../../../hooks/useSearch";
import { Context } from "../../../../../context/firebaseContext";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useChat from "../../../../../hooks/useChat";
import ReusebleModal from "../../../../../components/Modals/ReusebleModal";
import { setChats } from "../../../../../redux/actions/chatsAction";

const ModalSharePost = ({ activeModal, setActiveModal, updatedCurrentPost }) => {
    const [text, setText] = useState('')
    const [messageToPost, setMessageToPost] = useState('')
    const [usersFound, setUsersFound] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])
    const { searchUsers } = useSearch()

    const { doc, db, updateDoc, getDoc } = useContext(Context)

    const chatsArray = useSelector((state) => state.chatsReducer.chats)
    const userRedux = useSelector((state) => state.userReducer.user)

    const { createChat } = useChat(chatsArray)

    const dispatch = useDispatch()

    const changeText = async (e) => {
        const { value } = e.target
        setText(value)
        setUsersFound(await searchUsers(value))
    }

    const addToSelectedUsers = (user) => {
        setSelectedUsers(prevSelectedUsers => [...prevSelectedUsers, user])
        setText('')
    }
    const deleteSelectedUser = (user) => {
        const filteredArray = selectedUsers.filter(elem => elem.uid !== user.uid)
        setSelectedUsers([...filteredArray])
    }

    const closeModal = () => {
        setActiveModal(false)
        setUsersFound([])
        setSelectedUsers([])
        setText('')
    }


    const sendPost = async (usersArray) => {

        const key = await createChat(usersArray)
        
        const chatRef = doc(db, "chats", `${key}`);
        const docSnap = await getDoc(chatRef);

        const chatToUpdate = docSnap.data()

        const uniqKey = new Date().getTime().toString();

        const newMessage = {
            type: 'sharing',
            uniqKey_time: uniqKey,
            images: { heart: '', userImage: '' },
            text: '',
            user: { uid: userRedux.uid, displayName: userRedux.displayName, imageUrl: userRedux.imageUrl },
            post: {text: messageToPost, currentPost: updatedCurrentPost}
        }

        await updateDoc(chatRef, {
            "messages": [...chatToUpdate.messages, newMessage]
        });

        const mapChatsArray = chatsArray.map(elem => {
            if (elem.uid === chatToUpdate.uid) {
                return {
                    ...chatToUpdate,
                    messages: [...chatToUpdate.messages, newMessage]
                }
            } else return elem
        })

        dispatch(setChats(mapChatsArray))



        setActiveModal(false)
        setUsersFound([])
        setSelectedUsers([])
        setText('')
    }


    const mapUsersFound = usersFound.length > 0 ?
        usersFound.map((elem) => {
            const findUser = selectedUsers.length > 0 ? selectedUsers.find(user => user.uid === elem.uid) : false
            return (
                <li key={elem.uid} className="py-1.5 pl-4 hover:bg-gray-100/50 cursor-pointer" onClick={() => findUser ? deleteSelectedUser(elem) : addToSelectedUsers(elem)}>
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
                        <div className="relative">
                            <img src={`${(findUser) ? '/images/circle-full-blue-icon.png' : '/images/circle-contor.png'}`} className='h-6 w-6 ml-5' />
                            {
                                findUser && <div><img src='/images/check-white-icon.png' className='absolute h-5 w-5 top-0.5 right-0.5' /></div>
                            }
                        </div>
                    </div>
                </li>
            )
        })
        : false

    // const mapSuggestedUsers = chatsArray.map((elem) => {
    //     const strangeUser = chatsArray.users && chatsArray.users.find(user => user.uid === userRedux.uid)
    //     const findUser = selectedUsers.length > 0 ? selectedUsers.find(user => user.uid === elem.uid) : false
    //     return (
    //         <li key={elem.uid} className="py-1.5 pl-4 hover:bg-gray-100/50 cursor-pointer" onClick={() => findUser ? deleteSelectedUser(strangeUser) : addToSelectedUsers(strangeUser)}>
    //             <div className="flex justify-start items-center">
    //                 <div className="w-[2.75rem] h-[2.75rem] rounded-full overflow-hidden mt-1">
    //                     <img
    //                         className="w-full h-full object-cover"
    //                         src={`${strangeUser.imageUrl ? strangeUser.imageUrl : '/images/standart-profile.png'}`}
    //                         alt="UserPhoto"
    //                     />
    //                 </div>
    //                 <div className="w-[15rem] ml-3">
    //                     <p className="font-semibold text-sm">
    //                         {strangeUser.displayName}
    //                     </p>
    //                 </div>
    //                 <div className="relative">
    //                     <img src={`${(findUser) ? '/images/circle-full-blue-icon.png' : '/images/circle-contor.png'}`} className='h-6 w-6 ml-5' />
    //                     {
    //                         findUser && <div><img src='/images/check-white-icon.png' className='absolute h-5 w-5 top-0.5 right-0.5' /></div>
    //                     }
    //                 </div>
    //             </div>
    //         </li>
    //     )
    // })

    const mapSelectedUsers = selectedUsers.length > 0 ? (
        selectedUsers.map(elem => {
            return (
                <div key={elem.uid} className="bg-[#0195f6]/10 flex items-center px-2 py-1 mt-2 mr-2 rounded cursor-pointer" onClick={() => deleteSelectedUser(elem)}>
                    <div type="button" className=" text-[#0195f6] rounded text-sm">
                        {elem.displayName}
                    </div>
                    <img src="/images/close-icon-blue.png" className="w-3 h-3 ml-2 mt-0.5"></img>
                </div>
            )
        })
    ) : false


    return (
        <ReusebleModal
            activeModal={activeModal}
            setActiveModal={setActiveModal}
            styleForContainerBlock='fixed w-screen h-screen top-0 left-0 right-0 flex justify-center items-center z-20 cursor-default bg-black/60 duration-300'
            closeModal={closeModal}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-white w-[400px] h-2/3 rounded-xl duration-300 flex flex-col ${activeModal ? 'scale-100' : 'scale-50'}`}
            >
                <div className="border-b px-4 py-2">
                    <div className="flex justify-center ">

                        <div>
                            <p className="font-semibold">Share</p>
                        </div>
                        <button className="h-3.5 w-3.5 mt-2 absolute top-1.5 right-2.5" onClick={() => closeModal()}>
                            <img src="/images/close-icon.png" />
                        </button>
                    </div>
                </div>
                <div className="flex px-4 min-h-[55px] max-h-[calc(50%-41px)] border-b overflow-y-scroll">
                    <p className="font-semibold mr-6 mt-3.5">To: </p>
                    <div style={{ wordWrap: 'normal' }} className="flex flex-row flex-wrap">
                        {selectedUsers.length > 0 && mapSelectedUsers}
                        <input placeholder="Search..." className="outline-none placeholder:text-sm placeholder:text-gray-300 text-sm w-[300px] my-3" value={text} onChange={(e) => changeText(e)} />
                    </div>
                </div>
                <div className="rounded-xl overflow-y-scroll h-[calc(100%-96px)] w-full">
                    {text.length === 0 ?
                        (
                            <div className="px-4 mt-4">
                                {chatsArray.length > 0 ?
                                    (
                                        <ul className="mt-3">
                                            {/* {mapSuggestedUsers} */}
                                        </ul>
                                    )
                                    :
                                    (
                                        <>
                                            <p className="font-semibold text-sm">Suggested</p>
                                            <p className="text-gray-500 text-sm mt-7">No account found.</p>
                                        </>
                                    )
                                }

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
                                    <p className="text-gray-500 text-sm mt-7 ml-4">No account found.</p>
                                )
                        )
                    }
                </div>
                <div className="flex flex-col border-t">
                    {selectedUsers.length > 0 &&
                        (
                            <input
                                type='text'
                                value={messageToPost}
                                onChange={(e) => setMessageToPost(e.target.value)}
                                placeholder='Write a message...'
                                className="outline-none placeholder:text-sm pt-4 px-5 text-sm"
                            />
                        )
                    }
                    <div className="flex justify-center items-center p-4 ">
                        <button
                            disabled={!selectedUsers.length}
                            type="button"
                            className={`${!selectedUsers.length ? ' bg-[#0195f6]/40' : 'bg-[#0195f6]'} w-full py-1.5 text-white  rounded font-semibold`}
                            onClick={() => sendPost(selectedUsers)}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </ReusebleModal>
    )
}

export default ModalSharePost