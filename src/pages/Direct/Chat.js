import { onSnapshot } from "firebase/firestore";
import React, { useState, useContext, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/firebaseContext";
import { setChats } from "../../redux/actions/chatsAction";
import Picker from 'emoji-picker-react'
import Info from "./Info";
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized'

const Chat = () => {
    const chatsRedux = useSelector((state) => state.chatsReducer.chats)
    const userRedux = useSelector((state) => state.userReducer.user)
    const [messages, setMessages] = useState([])
    const [showPicker, setShowPicker] = useState(false)
    const [isInfoActive, setIsInfoActive] = useState(false)

    const scroll = useRef(null)
    // const cache = useRef(new CellMeasurerCache({
    //     fixedWidth: true,
    //     defaultHeigth: 50
    // }))

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
        scroll.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        scrollToBottom()
    }, [])


    const sendMessage = async () => {
        const uniqKey = new Date().getTime().toString();
        const chatRef = doc(db, "chats", `${chat}`);

        await updateDoc(chatRef, {
            "messages": [...messages, { uniqKey_time: uniqKey, images: { heart: '', userImage: '' }, text: text, user: { uid: userRedux.uid, displayName: userRedux.displayName, imageUrl: userRedux.imageUrl } }]
        });

        const mapChatsArray = chatsRedux.map(elem => {
            if (elem.uid === currentChat.uid) {
                return {
                    ...currentChat,
                    messages: [...messages, { uniqKey_time: uniqKey, text: text, user: { uid: userRedux.uid, displayName: userRedux.displayName, images: { heart: '', userImage: '' } } }]
                }
            } else return elem
        })

        dispatch(setChats(mapChatsArray))
        setText('')
    }

    const sendHeart = async () => {
        const uniqKey = new Date().getTime().toString();
        const pathName = `chats/heart/heart-red-icon.png`
        const imageUrl = await getDownloadURL(ref(storage, pathName))
        const chatRef = doc(db, "chats", `${chat}`);

        await updateDoc(chatRef, {
            "messages": [...messages, {
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
                    messages: [...messages, { uniqKey_time: uniqKey, text: text, user: { uid: userRedux.uid, displayName: userRedux.displayName, images: { heart: imageUrl, userImage: '' } } }]
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
                    messages: [...messages, { uniqKey_time: uniqKey, text: text, user: { uid: userRedux.uid, displayName: userRedux.displayName, images: { heart: '', userImage: imageUrl } } }]
                }
            } else return elem
        })

        dispatch(setChats(mapChatsArray))

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
                {
                    (elem.images.userImage || elem.images.heart) ?
                        (
                            <div style={{ wordWrap: "break-word" }} className={`mt-2 rounded-3xl max-w-[230px] ${elem.images.userImage && 'w-full object-cover'} 
                            ${elem.user.uid === userRedux.uid ? '' : (messages[idx + 1] ? messages[idx + 1].user.uid !== messages[idx].user.uid : true) ? '' : 'ml-9'}`}>
                                {elem.images.heart && <img alt="heart" src={elem.images.heart} className="w-12 h-12" />}
                                {elem.images.userImage &&
                                    (
                                        <div className="rounded-3xl border">
                                            <img alt="somePhoto" src={elem.images.userImage} className="rounded-3xl" />
                                        </div>
                                    )
                                }
                            </div>
                        )
                        :
                        (
                            <div style={{ wordWrap: "break-word" }} className={`py-2.5 px-4 mt-2 rounded-3xl max-w-[230px] 
                            ${elem.user.uid === userRedux.uid ? 'bg-black/5' : (messages[idx + 1] ? messages[idx + 1].user.uid !== messages[idx].user.uid : true) ? 'border' : 'border ml-9'}`}>
                                <span className="max-w-[230px] text-sm text-ellipsis">
                                    {elem.text}
                                </span>
                            </div>
                        )
                }

            </li>

        )
    })

    const strangeChatUser = currentChat.users.find(elem => elem.uid !== userRedux.uid)


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
                    <div className="w-[calc(100%-350px)] h-[100%-60px] flex flex-col">
                        <div className="w-full h-[60px] border-b">
                            <div className="flex justify-between items-center h-[60px] px-10">
                                <button className="flex cursor-pointer" onClick={() => navigate(`/${strangeChatUser.displayName}`)}>
                                    <div className="rounded-full overflow-hidden mr-4 ">
                                        <img className="w-6 h-6 object-cover" alt="userPhoto" src={strangeChatUser.imageUrl ? `${strangeChatUser.imageUrl}` : '/images/standart-profile.png'} />
                                    </div>
                                    <p className="font-semibold">{strangeChatUser.displayName}</p>
                                </button>
                                <div className="cursor-pointer" onClick={() => setIsInfoActive(true)}>
                                    <img className="h-6 w-6" alt="info" src='/images/info-contor-icon.png' />
                                </div>
                            </div>
                        </div>
                        <ul style={{ flexFlow: 'column nowrap' }} className="w-full h-full overflow-y-auto flex first-child:mt-auto px-4">
                            <div className="flex-auto"></div>
                            {allMessages}
                            {/* <AutoSizer>
                                {({ width, height }) => (
                                    <List
                                        width={width}
                                        height={height}
                                        rowHeight={cache.current.rowHeight}
                                        deferredMeasurementCache={cache.current}
                                        rowCount={messages.length}
                                        rowRenderer={({ key, index, style, parent }) => {
                                            const message = messages[index]

                                            return (
                                                <CellMeasurer key={key} cache ={cache.current} parent = {parent} columnIndex = {0} rowIndex = {index}> 
                                                <div style={style} className={`flex items-end pr-4 ${message.user.uid === userRedux.uid ? 'justify-end' : 'justify-start'}`}>
                                                        {
                                                            (message.user.uid !== userRedux.uid && (messages[index + 1] ? messages[index + 1].user.uid !== messages[index].user.uid : true)) &&
                                                            (
                                                                <div className="rounded-full overflow-hidden w-6 h-6 mr-3 mb-1">
                                                                    <Link to={`/${message.user.displayName}`}>
                                                                        <img className="w-6 h-6" alt="userPhoto" src={`${message.user.imageUrl ? message.user.imageUrl : '/images/standart-profile.png'}`} />
                                                                    </Link>
                                                                </div>
                                                            )
                                                        }
                                                        {
                                                            (message.images.userImage || message.images.heart) ?
                                                                (
                                                                    <div style={{ wordWrap: "break-word" }} className={`mt-2 rounded-3xl max-w-[230px] ${message.images.userImage && 'w-full object-cover'} 
                            ${message.user.uid === userRedux.uid ? '' : (messages[index + 1] ? messages[index + 1].user.uid !== messages[index].user.uid : true) ? '' : 'ml-9'}`}>
                                                                        {message.images.heart && <img alt="heart" src={message.images.heart} className="w-12 h-12" />}
                                                                        {message.images.userImage &&
                                                                            (
                                                                                <div className="rounded-3xl border">
                                                                                    <img alt="somePhoto" src={message.images.userImage} className="rounded-3xl" />
                                                                                </div>
                                                                            )
                                                                        }
                                                                    </div>
                                                                )
                                                                :
                                                                (
                                                                    <div style={{ wordWrap: "break-word" }} className={`py-2.5 px-4 mt-2 rounded-3xl max-w-[230px] pr-3
                            ${message.user.uid === userRedux.uid ? 'bg-black/5' : (messages[index + 1] ? messages[index + 1].user.uid !== messages[index].user.uid : true) ? 'border' : 'border ml-9'}`}>
                                                                        <span className="max-w-[230px] text-sm text-ellipsis">
                                                                            {message.text}
                                                                        </span>
                                                                    </div>
                                                                )
                                                        }

                                                    </div>
                                                </CellMeasurer>
                                            )
                                        }}
                                    />
                                )}
                            </AutoSizer> */}
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
                                        <div className="absolute top-2.5 right-5 cursor-pointer" onClick={() => sendHeart()}>
                                            <img alt="heart" src="/images/heart-uncolored.png" className="h-6 w-6" />
                                        </div>
                                        <div className="absolute top-2.5 right-14 cursor-pointer">
                                            <label className="cursor-pointer w-full text-sm font-bold text-sky-600 block text-center">
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    onChange={(e) => sendImage(e)}
                                                />
                                                <img alt="sendPhoto" src="/images/image-photo-icon.png" className="h-6 w-6" />
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

export default Chat