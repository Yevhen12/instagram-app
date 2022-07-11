import React, { useState, useContext, useEffect } from "react";
import ReusebleModal from "../../components/ReusebleModal";
import useSearch from "../../hooks/useSearch";
import { Context } from "../../context/firebaseContext";
import { useDispatch, useSelector } from "react-redux";
import { setChats } from "../../redux/actions/chatsAction";
import { useNavigate } from "react-router-dom";

const NewMessageModal = ({ activeModal, setActiveModal }) => {
    const [text, setText] = useState('')
    const [usersFound, setUsersFound] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])
    const { searchUsers } = useSearch()
    const { setDoc, doc, db, collection, getDocs } = useContext(Context)
    const chatsArray = useSelector((state) => state.chatsReducer.chats)
    const userRedux = useSelector((state) => state.userReducer.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()

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

    const createChat = async (usersArray) => {

        const querySnapshot = await getDocs(collection(db, "chats"));
        const mapQuerySnapshot = querySnapshot.docs.map((doc) => {
            return doc.data()
        });
        const allUsersInArray = [...usersArray, userRedux]
        const namesArrayUser = allUsersInArray.map(elem => elem.displayName)

        const isChatAlreadyExist = mapQuerySnapshot.find(elem => {
            const namesArrayElem = elem.users.map(elem => elem.displayName)
            return JSON.stringify(namesArrayUser.sort()) === JSON.stringify(namesArrayElem.sort())
        })
        if(isChatAlreadyExist) {
            navigate(`/direct/${isChatAlreadyExist.uid}`)
            setActiveModal(false)
            setUsersFound([])
            setSelectedUsers([])
            setText('')
            return
        }

        const uniqKey = new Date().getTime().toString();
        await setDoc(doc(db, "chats", `${uniqKey}`), {
            messages: [],
            users: [...usersArray, userRedux],
            uid: uniqKey,
        });
        dispatch(setChats([{ messages: [], users: [...usersArray, userRedux], uid: uniqKey }, ...chatsArray]))
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
                    <div className="flex justify-between ">
                        <button className="h-3.5 w-3.5 mt-2" onClick={() => closeModal()}>
                            <img src="/images/close-icon.png" />
                        </button>
                        <div>
                            <p className="font-semibold">New message</p>
                        </div>
                        <button
                            type="button"
                            className={`${selectedUsers.length > 0 ? 'text-[#0195f6]' : 'text-[#0195f6]/30'} font-semibold text-sm`}
                            disabled={selectedUsers.length > 0 ? false : true}
                            onClick={() => createChat(selectedUsers)}
                        >
                            Next
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
                                <p className="font-semibold text-sm">Suggested</p>
                                <p className="text-gray-500 text-sm mt-7">No account found.</p>
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

            </div>
        </ReusebleModal>
    )
}

export default NewMessageModal