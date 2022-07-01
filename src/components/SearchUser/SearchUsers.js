import React, { useState, useRef, useEffect } from "react";
import DropMenu from '../DropMenu'
import ModalSuggestions from "./ModalSuggestions";

const SearchUsers = () => {

    const inputEl = useRef(null);
    const [searchState, setSearchState] = useState(
        {
            searchFocus: false,
            searchBlur: true,
            searchText: ''
        }
    )
    const [activeModal, setActiveModal] = useState(false)

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

    const hendleChange = (e) => {
        const { value } = e.target
        setSearchState(prevSearchState => {
            return (
                {
                    ...prevSearchState,
                    searchText: value
                }
            )
        })
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
        inputEl.current.focus()
    }

    const styleSeacrhBlur = {
        paddingLeft: "40px",
    }

    useEffect(() => {
        if (searchState.searchText.length > 0) setActiveModal(true)
    }, [searchState])

    console.log(searchState)
    console.log(activeModal)

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
                                <img src="/images/close-for-search.png"></img>
                            </div>
                            <DropMenu
                                dropMenuProfile={activeModal}
                                setDropMenuProfile={setActiveModal}
                                styleForContainerBlock={`absolute w-[23.4rem] h-[22.6rem] shadow-defaultModal rounded bg-white flex items-center top-16 right-[48.5rem] p-0 m-0 z-20 cursor-pointer`}
                                styleForInnerBlock='flex items-center flex-col w-full'
                            >
                            </DropMenu>
                        </>
                    )
                    :
                    (
                        !activeModal &&
                        (
                            <>
                                <div className="h-3.5 w-3.5 absolute opacity-40 top-3 left-4">
                                    <img src="/images/zoom-for-search.png"></img>
                                </div>
                            </>
                        )
                    )
            }
        </div>
    )
}

export default SearchUsers