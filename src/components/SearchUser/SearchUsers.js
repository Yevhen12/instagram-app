import React, { useState, useRef, useEffect, useContext } from "react";
import DropMenu from '../DropMenu'
import useSearch from "../../hooks/useSearch";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/actions/userActions";
import { Context } from "../../context/firebaseContext";

const SearchUsers = () => {

    const userRedux = useSelector((state) => state.userReducer.user)
    const dispatch = useDispatch()
    const inputEl = useRef(null);
    const { doc, db, updateDoc } = useContext(Context)
    const { searchUsers } = useSearch()
    const [searchState, setSearchState] = useState(
        {
            searchFocus: false,
            searchBlur: true,
            searchText: ''
        }
    )
    const [activeModal, setActiveModal] = useState(false)
    const [usersSuggestions, setUsersSuggestions] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (searchState.searchText.length > 0) setActiveModal(true)
    }, [searchState])

    const hendleFocus = () => {
        setSearchState(prevSearchState => {
            return (
                {
                    ...prevSearchState,
                    searchFocus: true,
                    searchBlur: false

                }
            )
        })
        setActiveModal(true)
    }

    const hendleBlur = () => {
        setSearchState(prevSearchState => {
            return (
                {
                    ...prevSearchState,
                    searchFocus: false,
                    searchBlur: true

                }
            )
        })
    }

    const hendleChange = async (e) => {
        const { value } = e.target
        setSearchState(prevSearchState => {
            return (
                {
                    ...prevSearchState,
                    searchText: value
                }
            )
        })
        setUsersSuggestions(await searchUsers(value))
    }

    const clearInput = (e) => {
        setSearchState(prevSearchState => {
            return (
                {
                    ...prevSearchState,
                    searchText: '',
                }
            )
        })
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

    const clearVisitedUser = async (uid, e) => {
        e.stopPropagation()
        const ReduxUserRef = doc(db, "users", `${userRedux.uid}`);
        const filteredArrayVisitedUsers = userRedux.recentVisitedUsers.filter(elem => elem.uid !== uid)
        dispatch(setUser(
            {
                ...userRedux,
                recentVisitedUsers: [...filteredArrayVisitedUsers]
            }
        ))
        await updateDoc(ReduxUserRef, {
            "recentVisitedUsers": [...filteredArrayVisitedUsers]
        });
    }

    const clearAllVisitedUsers = async () => {
        const ReduxUserRef = doc(db, "users", `${userRedux.uid}`);
        dispatch(setUser(
            {
                ...userRedux,
                recentVisitedUsers: []
            }
        ))

        await updateDoc(ReduxUserRef, {
            "recentVisitedUsers": []
        });
    }

    const mapUsersSuggestions = usersSuggestions.length > 0 ?
        usersSuggestions.map((elem) => {
            return (
                <li key={elem.uid} className="py-1.5 pl-4 hover:bg-gray-100/50 cursor-pointer" onClick={() => redirectToAnotherUser(
                    {
                        displayName: elem.displayName,
                        imageUrl: elem.imageUrl,
                        uid: elem.uid
                    }
                )
                }
                >
                    <div className="flex justify-between items-center">
                        <div className="w-[2.75rem] h-[2.75rem] rounded-full overflow-hidden mt-1">
                            <img
                                className="w-full h-full object-cover"
                                src={`${elem.imageUrl ? elem.imageUrl : '/images/standart-profile.png'}`}
                                alt="UserPhoto"
                            />
                        </div>
                        <div className="w-[17.8rem] pr-5">
                            <p className="font-semibold text-sm">
                                {elem.displayName}
                            </p>
                        </div>
                    </div>
                </li>
            )
        })
        : false

    const mapRecentVisitedUsers = userRedux.recentVisitedUsers && userRedux.recentVisitedUsers.map(elem => {
        return (
            <li key={elem.uid} className="py-1.5 pl-4 hover:bg-gray-100/50 cursor-pointer" onClick={(e) => redirectToAnotherUser(
                {
                    displayName: elem.displayName,
                    imageUrl: elem.imageUrl,
                    uid: elem.uid
                }
            )
            }
            >
                <div className="flex justify-left items-center">
                    <div className="w-[2.75rem] h-[2.75rem] rounded-full overflow-hidden mt-1 mr-3">
                        <img
                            className="w-full h-full object-cover"
                            src={`${elem.imageUrl ? elem.imageUrl : '/images/standart-profile.png'}`}
                            alt="UserPhoto"
                        />
                    </div>
                    <div className="w-[15.5rem] pr-5">
                        <p className="font-semibold text-sm">
                            {elem.displayName}
                        </p>
                    </div>
                    <button type="button" className="p-1" onClick={(e) => clearVisitedUser(elem.uid, e)}>
                        <img alt="close" src="/images/close-icon.png" className="w-3.5 h-3.5 opacity-60" />
                    </button>
                </div>
            </li>
        )
    })


    return (
        <div className="relative">
            <div className="absolute z-20">
                <input
                    placeholder="Search"
                    style={(!activeModal) ? styleSeacrhBlur : null}
                    className={`bg-[#8E8E8E]/10 font-light outline-none py-1.5 px-4 rounded-lg placeholder:text-gray-400 placeholder:font-light w-[16.7rem] ${activeModal ? 'text-black' : 'text-gray-400'}`}
                    onFocus={hendleFocus}
                    onBlur={hendleBlur}
                    onChange={hendleChange}
                    value={searchState.searchText}
                    ref={inputEl}
                />
            </div>
            {
                (searchState.searchText.length > 0 && activeModal) ?
                    (
                        <>
                            <div
                                className="h-4 w-4 absolute top-2.5 right-20 opacity-20 cursor-pointer z-20"
                                type="button"
                                onClick={clearInput}
                            >
                                <img src="/images/close-for-search.png" />
                            </div>
                            <DropMenu
                                styleForWindowBlock="w-full h-full fixed top-0 left-0 flex justify-center items-center z-10 cursor-default "
                                dropMenuProfile={activeModal}
                                setDropMenuProfile={setActiveModal}
                                styleForContainerBlock={`fixed w-[23.4rem] h-[22.6rem] shadow-defaultModal rounded bg-white flex top-16 right-[48.5rem] p-0 m-0 z-20`}
                                styleForInnerBlock='flex flex-col w-full overflow-y-scroll'
                            >
                                {
                                    mapUsersSuggestions.length > 0 ?
                                        (
                                            <ul className="pt-3">
                                                {mapUsersSuggestions}
                                            </ul>
                                        )
                                        :
                                        (
                                            <div className="flex items-center justify-center h-full">
                                                <p className="text-sm text-gray-400">No results found.</p>
                                            </div>
                                        )
                                }
                            </DropMenu>
                        </>
                    )
                    :
                    (
                        (searchState.searchText.length === 0 && activeModal) ?
                            (
                                <DropMenu
                                    styleForWindowBlock="w-full h-full fixed top-0 left-0 flex justify-center items-center z-10 cursor-default "
                                    dropMenuProfile={activeModal}
                                    setDropMenuProfile={setActiveModal}
                                    styleForContainerBlock={`fixed w-[23.4rem] h-[22.6rem] shadow-defaultModal rounded bg-white flex top-16 right-[48.5rem] p-0 m-0 z-20`}
                                    styleForInnerBlock='flex flex-col w-full overflow-y-scroll'
                                >
                                    <div className="flex justify-between pt-5 px-4">
                                        <p className="font-semibold">Recent</p>
                                        <button type="button" className="text-sm font-semibold text-[#0195f6]" onClick={() => clearAllVisitedUsers()}>Clear all</button>
                                    </div>
                                    <ul className="pt-2">
                                        {mapRecentVisitedUsers}
                                    </ul>
                                </DropMenu>
                            )
                            :
                            (
                                !activeModal &&
                                <div className="h-3.5 w-3.5 absolute opacity-40 top-3 left-4">
                                    <img src="/images/zoom-for-search.png"></img>
                                </div>
                            )
                    )
            }
        </div>
    )
}

export default SearchUsers