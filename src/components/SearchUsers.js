import React, {useState} from "react";

const SearchUsers = () => {
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
        const {value} = e.target
        setSearchState(prevSearchState => {
            return (
                {
                    ...prevSearchState,
                    seerchText: value
                }
            )
        })
    }

    const styleSeacrhBlur = {
        backgroundImage: `url(../images/zoom-for-search.png)`,
        backgroundSize: '14px 14px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top 12px left 15px',
        opacity: "50%",
        paddingLeft: "40px",
    }

    console.log(searchState)
    return (
        <div className="ml-10">
        <input
            placeholder="Search"
            style = {!searchState.searchFocus ? styleSeacrhBlur : null}
            className={`bg-[#8E8E8E]/20 outline-none py-1.5 px-4 rounded-lg placeholder:text-gray-700 placeholder:font-light w-[16.7rem] color-black`}
            onFocus = {hendleFocus}
            onBlur = {hendleBlur}
            onChange = {hendleChange}
        />
    </div>
    )
}

export default SearchUsers