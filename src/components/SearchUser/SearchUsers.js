import React, { useState, useRef, useEffect } from "react";
import useSearch from "../../hooks/useSearch";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/actions/userActions";
import ModalSuggestions from "./components/ModalTypes/ModalSuggestions";
import ModalRecentUsers from "./components/ModalTypes/ModalRecentUsers";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const SearchUsers = () => {

    const userRedux = useSelector((state) => state.userReducer.user)
    const dispatch = useDispatch()
    const inputEl = useRef(null);
    const { searchUsers } = useSearch()
    const [searchText, setSearchText] = useState('')
    const [activeModal, setActiveModal] = useState(false)
    const [usersSuggestions, setUsersSuggestions] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (searchText.length > 0) setActiveModal(true)
    }, [searchText])

    const hendleFocus = () => {
        setActiveModal(true)
    }

    const hendleChange = async (e) => {
        setSearchText(e.target.value)
        setIsLoading(true)
        setUsersSuggestions(await searchUsers(e.target.value))
        setIsLoading(false)
    }

    const clearInput = (e) => {
        setSearchText('')
        setUsersSuggestions([])
        inputEl.current.focus()
    }

    const styleSeacrhBlur = {
        paddingLeft: "40px",
    }

    const redirectToAnotherUser = async ({ displayName, imageUrl, uid }) => {
        setActiveModal(false)
        navigate(`/${displayName}`)

        const ReduxUserRef = doc(db, "users", `${userRedux.uid}`);
        const filteredRecentVisitedUsers = userRedux.recentVisitedUsers.filter(elem => elem.displayName != displayName)
        dispatch(setUser(
            {
                ...userRedux,
                recentVisitedUsers: [{ displayName, imageUrl, uid }, ...filteredRecentVisitedUsers]
            }
        ))
        await updateDoc(ReduxUserRef, {
            "recentVisitedUsers": [{ displayName, imageUrl, uid }, ...filteredRecentVisitedUsers]
        });
    }

    return (
        <div className="relative">
            <div className="absolute z-20">
                <input
                    placeholder="Search"
                    style={(!activeModal) ? styleSeacrhBlur : null}
                    className={`bg-[#8E8E8E]/10 font-light outline-none py-1.5 px-4 rounded-lg placeholder:text-gray-400 placeholder:font-light w-[16.7rem] ${activeModal ? 'text-black' : 'text-gray-400'}`}
                    onFocus={hendleFocus}
                    onChange={hendleChange}
                    value={searchText}
                    ref={inputEl}
                />
            </div>
            {
                (searchText.length > 0 && activeModal) ?
                    (
                        <>
                            <div
                                className="h-4 w-4 absolute top-2.5 right-20 opacity-20 cursor-pointer z-20"
                                type="button"
                                onClick={clearInput}
                            >
                                <img src={process.env.PUBLIC_URL + "/images/close-for-search.png"} />
                            </div>
                            <ModalSuggestions isLoading = {isLoading} usersSuggestions={usersSuggestions} activeModal={activeModal} setActiveModal={setActiveModal} redirectToAnotherUser={redirectToAnotherUser} />
                        </>
                    )
                    :
                    (
                        (searchText.length === 0 && activeModal) ?
                            (
                                <ModalRecentUsers activeModal={activeModal} setActiveModal={setActiveModal} redirectToAnotherUser={redirectToAnotherUser} />
                            )
                            :
                            (
                                !activeModal &&
                                <div className="h-3.5 w-3.5 absolute opacity-40 top-3 left-4">
                                    <img src={process.env.PUBLIC_URL + "/images/zoom-for-search.png"} />
                                </div>
                            )
                    )
            }
        </div>
    )
}

export default React.memo(SearchUsers)