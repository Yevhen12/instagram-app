import React, { useState, useEffect, useContext, useCallback, useMemo } from "react";
import Header from "../../components/Header/Header";
import { useSelector, useDispatch } from "react-redux";
import NewMessageModal from "./Modals/NewMessageModal";
import { Context } from "../../context/firebaseContext";
import { setChats } from "../../redux/actions/chatsAction";
import { Outlet, Link, useLocation, useParams } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import UserItem from "./Items/UserItem";
import SkeletonItem from "./Items/SkeletonItem";
import 'react-loading-skeleton/dist/skeleton.css'
import Loading from "../../components/Loaders/Loaging";

const Direct = () => {
    const [activeModal, setActiveModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const userRedux = useSelector((state) => state.userReducer.user)
    const chatsArray = useSelector((state) => state.chatsReducer.chats)
    const { db, collection, getDocs } = useContext(Context)
    const dispatch = useDispatch()
    const location = useLocation()
    const { chat } = useParams()

    const isChat = chatsArray.find(elem => chat === elem.uid)

    useEffect(() => {
        setIsLoading(true)
        const getChats = async () => {
            const querySnapshot = await getDocs(collection(db, "chats"));
            const mapQuerySnapshot = querySnapshot.docs.map((doc) => {
                return doc.data()
            });
            const filteredArray = mapQuerySnapshot.filter(elem => {
                const mapUidUsers = elem.users.map(someUser => someUser.uid)
                return mapUidUsers.includes(userRedux.uid)
            })
            dispatch(setChats(filteredArray))
            setIsLoading(false)
        }
        getChats()
    }, [userRedux.uid])

    const sortChatsArray = chatsArray.sort((a, b) => {
        if (!b.messages.length || !a.messages.length) return b.uid - a.uid
        else return b.messages[b.messages.length - 1].uniqKey_time - a.messages[a.messages.length - 1].uniqKey_time
    })

    const openModal = useCallback(() => {
        setActiveModal(true)
    }, [])

    const isCorrect = !isChat && location.pathname !== '/direct'

    const mapChatsArray = useMemo(() => sortChatsArray.map((elem, idx) => <UserItem key={idx} chat={elem} />), [sortChatsArray])
    const skeletonItems = Array(3).fill(0).map((_, idx) => <SkeletonItem key={idx} />)

    const isSkeletonShowing = chatsArray.length === 0 || isLoading

    return (
        <div>
            <Header />
            {isCorrect ?
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
                                                    <img src="/images/new-message-icon.png" className="w-5 h-5" onClick={openModal} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-[calc(100%-60px)] border-r overflow-y-auto">
                                        <div>
                                            <p className="font-semibold p-3">Messages</p>
                                            <ul className="flex flex-col">
                                                {
                                                    isSkeletonShowing ?
                                                        <>
                                                            {skeletonItems}
                                                            <div className="h-full justify-center flex items-center mt-8">
                                                                <Loading height={30} width={30} />
                                                            </div>
                                                        </>
                                                        :
                                                        mapChatsArray
                                                }
                                            </ul>
                                        </div>
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
                                                <button type="button" className="rounded bg-[#0195f6] px-2.5 py-1.5 text-sm text-white font-semibold mt-5" onClick={openModal}>
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

export default React.memo(Direct)