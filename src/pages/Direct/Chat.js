import { onSnapshot } from "firebase/firestore";
import React, { useState, useContext, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/firebaseContext";
import { setChats } from "../../redux/actions/chatsAction";
import Picker from 'emoji-picker-react'

const Chat = () => {
    const chatsRedux = useSelector((state) => state.chatsReducer)
    const userRedux = useSelector((state) => state.userReducer.user)
    const [messages, setMessages] = useState([])
    const [showPicker, setShowPicker] = useState(false)
    const ref = useRef(null)

    const dispatch = useDispatch()

    const { chat } = useParams()

    const currentChat = chatsRedux.find(elem => elem.uid === chat)

    const { updateDoc, doc, db, getDoc, onSnapshot } = useContext(Context)
    const [text, setText] = useState('')

    const navigate = useNavigate()
    const hendleText = (e) => {
        const { value } = e.target
        setText(value)
    }

    useEffect(() => {
        const getMsg = async () => {
            const ref = doc(db, "chats", `${currentChat.uid}`)
            if (messages.length === 0) {
                const docSnap = await getDoc(ref);
                setMessages(docSnap.data().messages)
            }

            onSnapshot(doc(db, "chats", `${currentChat.uid}`), (doc) => {
                const allMessages = doc.data().messages
                setMessages(allMessages)
            })

        }

        getMsg()

    }, [chat])

    const scrollToBottom = () => {
        ref.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])


    const sendMessage = async () => {
        const uniqKey = new Date().getTime().toString();
        const chatRef = doc(db, "chats", `${chat}`);

        await updateDoc(chatRef, {
            "messages": [...messages, { uniqKey_time: uniqKey, text: text, user: { uid: userRedux.uid, displayName: userRedux.displayName, imageUrl: userRedux.imageUrl } }]
        });

        const mapChatsArray = chatsRedux.map(elem => {
            if (elem.uid === currentChat.uid) {
                return {
                    ...currentChat,
                    messages: [...messages, { uniqKey_time: uniqKey, text: text, user: { uid: userRedux.uid, displayName: userRedux.displayName, imageUrl: userRedux.imageUrl} }]
                }
            } else return elem
        })

        dispatch(setChats(mapChatsArray))
        setText('')
    }

    const onEmojiClick = (event, emojiObject) => {
        setText(prevText => prevText + emojiObject.emoji)
        setShowPicker(false)
    }

    const allMessages = messages.length > 0 && messages.map((elem, idx) => {
        return (
            <li key={elem.uniqKey_time} className={`flex items-end ${elem.user.uid === userRedux.uid ? 'justify-end' : 'justify-start'}`}>
                {
                    (elem.user.uid !== userRedux.uid && (messages[idx + 1] ? messages[idx + 1].user.uid !== messages[idx].user.uid : true)) &&
                    (
                        <div className="rounded-full overflow-hidden w-6 h-6 mr-3 mb-1">
                            <Link to={`/${elem.user.displayName}`}>
                                <img className="w-6 h-6" alt="userPhoto" src={`${elem.user.imageUrl ? elem.user.imageUrl : '/images/standart-profile.png'}`} />
                            </Link>
                        </div>
                    )
                }
                <div style={{ wordWrap: "break-word" }} className={`py-2.5 px-4 mt-2 rounded-3xl max-w-[230px] 
                ${elem.user.uid === userRedux.uid ? 'bg-black/5' : (messages[idx + 1] ? messages[idx + 1].user.uid !== messages[idx].user.uid : true) ? 'border' : 'border ml-9'}`}>
                    <span className="max-w-[230px] text-sm text-ellipsis">{elem.text}</span>
                </div>
            </li>
        )
    })



    const strangeChatUser = currentChat.users.find(elem => elem.uid !== userRedux.uid)
    console.log(strangeChatUser.imageUrl)

    return (
        <div className="w-[calc(100%-350px)] h-[100%-60px] flex flex-col">
            <div className="w-full h-[60px] border-b">
                <div className="flex justify-between items-center h-[60px] px-10">
                    <button className="flex cursor-pointer" onClick={() => navigate(`/${strangeChatUser.displayName}`)}>
                        <div className="rounded-full overflow-hidden mr-4 ">
                            <img className="w-6 h-6 object-cover" alt="userPhoto" src={strangeChatUser.imageUrl ? `${strangeChatUser.imageUrl}` : '/images/standart-profile.png'} />
                        </div>
                        <p className="font-semibold">{strangeChatUser.displayName}</p>
                    </button>
                    <div className="cursor-pointer">
                        <img className="h-6 w-6" alt="info" src='/images/info-contor-icon.png' />
                    </div>
                </div>
            </div>
            <ul style={{ flexFlow: 'column nowrap' }} className="w-full h-[calc(100%)] overflow-y-auto flex flex-col pr-4 first-child: mt-auto pl-4">
                {allMessages}
                <div ref={ref}></div>
            </ul>
            <div className="m-5 relative">
                <input
                    placeholder="Message..."
                    className="border w-full rounded-3xl pr-2.5 pl-16 py-2.5 placeholder:text-sm outline-none text-sm"
                    value={text}
                    onChange={(e) => hendleText(e)}
                />
                <button className="absolute top-2.5 left-5" onClick={() => setShowPicker(prevShowPicker => !prevShowPicker)}>
                    <img alt="smile" src="/images/smile-icon.png" className="w-6 h-6" />
                </button>
                {
                    showPicker &&
                    (
                        <div
                            className={`w-full h-full fixed top-0 left-0 items-center z-20 ${showPicker ? 'pointer-events-auto' : 'pointer-events-none'}`}
                            onClick={() => setShowPicker(false)}
                        >
                            <div onClick={(e) => e.stopPropagation()}>
                                <Picker
                                    onEmojiClick={onEmojiClick}
                                    pickerStyle={
                                        {
                                            width: '310px',
                                            position: "absolute",
                                            top: '500px',
                                            left: '840px'
                                        }
                                    }
                                />
                            </div>
                        </div>
                    )
                }
                {text.length > 0 ?
                    (
                        <button
                            type="button"
                            className="text-[#0195f6] text-sm absolute font-semibold top-3 right-5"
                            onClick={() => sendMessage()}
                        >
                            Send
                        </button>
                    )
                    :
                    (
                        <div>
                            <div className="absolute top-2.5 right-5 cursor-pointer" >
                                <img alt = "heart" src="/images/heart-uncolored.png" className="h-6 w-6"/>
                            </div>
                        </div>
                    )
                }

            </div>

        </div>

    )
}

export default Chat