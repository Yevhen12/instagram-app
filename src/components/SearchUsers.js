import React, { useState, useRef } from "react";

const SearchUsers = () => {

    const inputEl = useRef(null);
    const [searchState, setSearchState] = useState(
        {
            searchFocus: false,
            searchBlur: true,
            seerchText: ''
        }
    )

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
                    seerchText: value
                }
            )
        })
    }

    const clearInput = (e) => {
        setSearchState(prevSearchState => {
            return (
                {
                    ...prevSearchState,
                    seerchText: '',
                }
            )
        })
        console.log(1)
        inputEl.current.focus()
    }

    const styleSeacrhBlur = {
        paddingLeft: "40px",
    }

    console.log(searchState)

    return (
        <div className="ml-10 relative">
            <input
                placeholder="Search"
                style={!searchState.searchFocus ? styleSeacrhBlur : null}
                className={`bg-[#8E8E8E]/20 outline-none py-1.5 px-4 rounded-lg placeholder:text-gray-400 placeholder:font-light w-[16.7rem]`}
                onFocus={hendleFocus}
                onBlur={hendleBlur}
                onChange={hendleChange}
                value = {searchState.seerchText}
                ref={inputEl}
            />
            {
                searchState.searchFocus ?
                    (
                        <>
                            <div
                                className="h-4 w-4 absolute top-2.5 right-4 opacity-20 cursor-pointer"
                                onClick={() => console.log(1)}
                            >
                                <img src="/images/close-for-search.png"></img>
                            </div>
                        </>
                    )
                    :
                    (
                        <>
                            <div className="h-3.5 w-3.5 absolute opacity-50 top-3 left-4">
                                <img src="/images/zoom-for-search.png"></img>
                            </div>
                        </>
                    )
            }
        </div>
    )
}

export default SearchUsers