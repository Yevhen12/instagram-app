import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/Header";
import { useSelector, useDispatch } from "react-redux";
import NewMessageModal from "./NewMessageModal";
import { Context } from "../../context/firebaseContext";
import { setChats } from "../../redux/actions/chatsAction";
import { Outlet, Link, useLocation, useParams } from "react-router-dom";
import NotFound from "../NotFound";

const Direct = () => {
    const [activeModal, setActiveModal] = useState(false)
    const userRedux = useSelector((state) => state.userReducer.user)
    const chatsArray = useSelector((state) => state.chatsReducer)
    const { db, collection, getDocs } = useContext(Context)
    const dispatch = useDispatch()
    const location = useLocation()
    const { chat } = useParams()

    const isChat = chatsArray.find(elem => chat === elem.uid)

    useEffect(() => {
        const getChats = async () => {
            const querySnapshot = await getDocs(collection(db, "chats"));
            const mapQuerySnapshot = querySnapshot.docs.map((doc) => {
                return doc.data()
            });
            const filteredArray = mapQuerySnapshot.filter(elem => {
                const mapUidUsers = elem.users.map(someUser => someUser.uid)
                return mapUidUsers.includes(userRedux.uid)
            })
            console.log(filteredArray)
            dispatch(setChats(filteredArray))
        }
        getChats()
    }, [userRedux.uid])

    console.log(userRedux)

    const sortChatsArray = chatsArray.sort((a, b) => b.messages[b.messages.length - 1].uniqKey_time - a.messages[a.messages.length - 1].uniqKey_time)

    const mapChatsArray = sortChatsArray.map((elem, idx) => {
        const strangeUser = elem.users.find(elem => elem.uid !== userRedux.uid)
        const time = new Date(((new Date().getTime() - elem.messages[elem.messages.length - 1].uniqKey_time)))
        
        const minutes = time.getMinutes()
        const hours = minutes > 60 ? (minutes / 60).toFixed(0) : 0
        const days = hours > 24 ? (hours / 24).toFixed(0) : 0
        const weeks = days > 7 ? (days / 7).toFixed(0) : 0
        const months = days > 30 ? (days / 30).toFixed(0) : 0
        const years = months > 12 ? (months / 12).toFixed(0) : 0
        const nowTime = minutes === 0 ? 'Now' : 0

        console.log("hours" + time.getHours())

        const currentTime = (years || months || weeks || days || hours || minutes || nowTime)
        const currentTimeString = (currentTime === years && currentTime.toString() + 'd') || (currentTime === months && currentTime.toString() + 'm')
            || (currentTime === weeks && currentTime.toString() + 'w') || (currentTime === days && currentTime.toString() + 'd') ||
            (currentTime === hours && currentTime.toString() + 'h') || (currentTime === minutes && currentTime.toString() + 'm') || 'Now'


        console.log(time.getTime())

        console.log("  minutes" + minutes + "   hours" + hours + "  days" + days + "  month" + months + "  years" + years)
        return (
            <li key={idx} className={`py-1.5 pl-4 hover:bg-gray-100/50 cursor-pointer ${location.pathname === `/direct/${elem.uid}` && 'bg-black/5 hover:bg-black/5 cursor-default'}`}>
                <Link to={elem.uid} className={`${location.pathname === `/direct/${elem.uid}` && 'cursor-default'}`}>
                    <div className="flex justify-left items-center">
                        <div className="w-[3.5rem] h-[3.5rem] rounded-full overflow-hidden mt-1 mr-3">
                            <img
                                className="w-full h-full object-cover"
                                src={`${strangeUser.imageUrl ? strangeUser.imageUrl : '/images/standart-profile.png'}`}
                                alt="UserPhoto"
                            />
                        </div>
                        <div className="w-[15.5rem] pr-5">
                            <p className="text-sm">
                                {strangeUser.displayName}
                            </p>
                            <p className="text-sm text-black/40">{elem.messages[elem.messages.length - 1].text} · {currentTimeString}</p>
                        </div>
                    </div>
                </Link>
            </li>
        )
    })



    return (
        <div>
            <Header />
            {(!isChat && location.pathname !== '/direct') ?
                (
                    <NotFound />
                )
                :
                (
                    <section className="flex justify-center">
                        <div className="container max-w-5xl pt-3 pb-5 h-[calc(100vh-65px)] pl-6 pr-7">
                            <div className="border w-full h-full rounded bg-white flex">
                                <div className="w-[350px]">
                                    <div className="h-[60px] border-b border-r">
                                        <div className="h-[60px] flex justify-center items-center relative">
                                            <button type="button" className="p-2">
                                                <div className="flex">
                                                    <div className="mr-1">
                                                        <p className="font-semibold">{userRedux.displayName}</p>
                                                    </div>
                                                    <div>
                                                        <img className="h-6 w-6" src="/images/down-arrow.png" />
                                                    </div>
                                                </div>
                                            </button>
                                            <div className="mt-1.5 absolute top-3.5 right-3.5">
                                                <button type="button">
                                                    <img src="/images/new-message-icon.png" className="w-5 h-5" onClick={() => setActiveModal(true)} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-[calc(100%-60px)] border-r overflow-y-auto">
                                        {
                                            chatsArray.length > 0 ?
                                                (
                                                    <div>
                                                        <p className="font-semibold p-3">Messages</p>
                                                        <ul className="flex flex-col">
                                                            {mapChatsArray}
                                                        </ul>
                                                    </div>
                                                )
                                                :
                                                (
                                                    <div>

                                                    </div>
                                                )
                                        }
                                    </div>
                                </div>
                                {location.pathname === '/direct' ?
                                    (
                                        <div className="w-[calc(100%-350px)]">
                                            <div className="h-full flex items-center justify-center flex-col">
                                                <div className="w-24 h-24">
                                                    <img src="/images/send-message-circle-icon.png" />
                                                </div>
                                                <div className="mt-3">
                                                    <p className="font-light text-2xl">Your Messages</p>
                                                </div>
                                                <div className="mt-2">
                                                    <p className="font-light text-sm text-gray-500">Send private photos and messages to a friend or group.</p>
                                                </div>
                                                <button type="button" className="rounded bg-[#0195f6] px-2.5 py-1.5 text-sm text-white font-semibold mt-5" onClick={() => setActiveModal(true)}>
                                                    Send Message
                                                </button>
                                            </div>
                                        </div>
                                    )
                                    :
                                    (
                                        <Outlet />
                                    )
                                }


                            </div>
                        </div>
                        <NewMessageModal
                            activeModal={activeModal}
                            setActiveModal={setActiveModal}
                        />
                    </section>
                )
            }

        </div>
    )
}

export default Direct