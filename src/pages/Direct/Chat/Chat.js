import React, { useState, useContext, useEffect, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../context/firebaseContext";
import { setChats } from "../../../redux/actions/chatsAction";
import Info from "./Info/Info";
import EmojiModal from "../../../components/EmojiModal/EmojiModal";
import Message from "./Messages/Message";

const Chat = () => {
    const chatsRedux = useSelector((state) => state.chatsReducer.chats)
    const userRedux = useSelector((state) => state.userReducer.user)
    const [messages, setMessages] = useState([])
    const [showPicker, setShowPicker] = useState(false)
    const [isInfoActive, setIsInfoActive] = useState(false)

    const scroll = useRef(null)
    const dispatch = useDispatch()
    const { chat } = useParams()

    const currentChat = chatsRedux.find(elem => elem.uid === chat)

    const { updateDoc, doc, db, getDoc, onSnapshot, storage, ref, uploadBytes, getDownloadURL } = useContext(Context)
    const [text, setText] = useState('')

    const navigate = useNavigate()
    const hendleText = (e) => {
        const { value } = e.target
        setText(value)
    }

    useEffect(() => {
        if (chat) {
            const getMsg = async () => {
                const ref = doc(db, "chats", `${currentChat.uid}`)
                if (messages.length === 0) {
                    const docSnap = await getDoc(ref);
                    setMessages(docSnap.data().messages)
                }

                onSnapshot(doc(db, "chats", `${currentChat.uid}`), (doc) => {
                    if (doc.exists()) {
                        const allMessages = doc.data().messages
                        setMessages(allMessages)
                    }
                })

            }

            getMsg()
        }

        setIsInfoActive(false)

    }, [chat])

    const scrollToBottom = () => {
        scroll.current.scrollIntoView({ block: "end" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        scrollToBottom()
    }, [])


    const sendMessage = async () => {
        setText('')
        const uniqKey = new Date().getTime().toString();
        const chatRef = doc(db, "chats", `${chat}`);

        await updateDoc(chatRef, {
            "messages": [...messages, { type: 'typical', uniqKey_time: uniqKey, images: { heart: '', userImage: '' }, text: text, user: { uid: userRedux.uid, displayName: userRedux.displayName, imageUrl: userRedux.imageUrl } }]
        });

        const mapChatsArray = chatsRedux.map(elem => {
            if (elem.uid === currentChat.uid) {
                return {
                    ...currentChat,
                    messages: [...messages, { type: 'typical',  uniqKey_time: uniqKey, text: text, user: { uid: userRedux.uid, displayName: userRedux.displayName, images: { heart: '', userImage: '' } } }]
                }
            } else return elem
        })

        dispatch(setChats(mapChatsArray))

    }

    const sendHeart = async () => {
        const uniqKey = new Date().getTime().toString();
        const pathName = `chats/heart/heart-red-icon.png`
        const imageUrl = await getDownloadURL(ref(storage, pathName))
        const chatRef = doc(db, "chats", `${chat}`);

        await updateDoc(chatRef, {
            "messages": [...messages, {
                type: 'heart',
                uniqKey_time: uniqKey,
                text: '',
                images: {
                    heart: imageUrl,
                    userImage: ''
                },
                user: {
                    uid: userRedux.uid,
                    displayName: userRedux.displayName,
                    imageUrl: userRedux.imageUrl
                }
            }
            ]
        })

        const mapChatsArray = chatsRedux.map(elem => {
            if (elem.uid === currentChat.uid) {
                return {
                    ...currentChat,
                    messages: [...messages, { type: 'heart', uniqKey_time: uniqKey, text: text, user: { uid: userRedux.uid, displayName: userRedux.displayName, images: { heart: imageUrl, userImage: '' } } }]
                }
            } else return elem
        })

        dispatch(setChats(mapChatsArray))

    }

    const sendImage = async (e) => {

        const uniqKey = new Date().getTime().toString();
        const currentFile = e.target.files[0]
        const pathName = `/chats/images/${chat}/${uniqKey}`
        const fileReff = ref(storage, pathName);

        await uploadBytes(fileReff, currentFile)

        const imageUrl = await getDownloadURL(ref(storage, pathName))

        const chatRef = doc(db, "chats", `${chat}`);

        await updateDoc(chatRef, {
            "messages": [...messages, {
                type: 'image',
                uniqKey_time: uniqKey,
                text: '',
                images: {
                    heart: '',
                    userImage: imageUrl
                },
                user: {
                    uid: userRedux.uid,
                    displayName: userRedux.displayName,
                    imageUrl: userRedux.imageUrl
                }
            }
            ]
        })

        const mapChatsArray = chatsRedux.map(elem => {
            if (elem.uid === currentChat.uid) {
                return {
                    ...currentChat,
                    messages: [...messages, { type: 'image', uniqKey_time: uniqKey, text: text, user: { uid: userRedux.uid, displayName: userRedux.displayName, images: { heart: '', userImage: imageUrl } } }]
                }
            } else return elem
        })

        dispatch(setChats(mapChatsArray))

    }

    const pickerStyle = {
        width: '310px',
        position: "absolute",
        top: '-330px',
        left: '0px',
        zIndex: '21'
    }

    const allMessages = messages.length > 0 && messages.map((elem, idx) => <Message key={idx} messages = {messages} message={elem} idx={idx} />)
  //  const shareMessage = messages.filter(elem => )

    const strangeChatUser = useMemo(() => currentChat.users.find(elem => elem.uid !== userRedux.uid), [currentChat.users])


    return (
        <>
            {isInfoActive ?
                (
                    <Info
                        setIsInfoActive={setIsInfoActive}
                        strangeChatUser={strangeChatUser}
                    />
                )
                :
                (
                    <div className="sm:w-[calc(100%-350px)] w-full h-[100%-60px] flex flex-col">
                        <div className="w-full h-[60px] border-b">
                            <div className="flex justify-between items-center h-[60px] px-10">
                                <button className="flex cursor-pointer" onClick={() => navigate(`/${strangeChatUser.displayName}`)}>
                                    <div className="rounded-full overflow-hidden mr-4 ">
                                        <img className="w-6 h-6 object-cover" alt="userPhoto" src={strangeChatUser.imageUrl ? `${strangeChatUser.imageUrl}` : process.env.PUBLIC_URL + '/images/standart-profile.png'} />
                                    </div>
                                    <p className="font-semibold">{strangeChatUser.displayName}</p>
                                </button>
                                <div className="cursor-pointer" onClick={() => setIsInfoActive(true)}>
                                    <img className="h-6 w-6" alt="info" src={process.env.PUBLIC_URL + '/images/info-contor-icon.png'} />
                                </div>
                            </div>
                        </div>
                        <ul style={{ flexFlow: 'column nowrap' }} className="w-full h-full overflow-y-auto flex first-child:mt-auto px-4">
                            <div className="flex-auto"></div>
                            {allMessages}
                            <div ref={scroll}></div>
                        </ul>

                        <div className="m-5 relative">
                            <input
                                placeholder="Message..."
                                className="border w-full rounded-3xl pr-2.5 pl-16 py-2.5 placeholder:text-sm outline-none text-sm"
                                value={text}
                                onChange={(e) => hendleText(e)}
                            />
                            <button className="absolute top-2.5 left-5" onClick={() => setShowPicker(prevShowPicker => !prevShowPicker)}>
                                <img alt="smile" src={process.env.PUBLIC_URL + "/images/smile-icon.png"} className="w-6 h-6" />
                            </button>
                            <EmojiModal
                                showPicker={showPicker}
                                setShowPicker={setShowPicker}
                                pickerStyle={pickerStyle}
                                setText={setText}
                            />
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
                                        <div className="absolute top-2.5 right-5 cursor-pointer" onClick={() => sendHeart()}>
                                            <img alt="heart" src={process.env.PUBLIC_URL + "/images/heart-uncolored.png"} className="h-6 w-6" />
                                        </div>
                                        <div className="absolute top-2.5 right-14 cursor-pointer">
                                            <label className="cursor-pointer w-full text-sm font-bold text-sky-600 block text-center">
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    onChange={(e) => sendImage(e)}
                                                />
                                                <img alt="sendPhoto" src={process.env.PUBLIC_URL + "/images/image-photo-icon.png"} className="h-6 w-6" />
                                            </label>
                                        </div>
                                    </div>
                                )
                            }

                        </div>

                    </div>

                )
            }

        </>

    )
}

export default React.memo(Chat)