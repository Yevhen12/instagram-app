import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../context/firebaseContext";
import { useSelector } from "react-redux";
import UserSuggest from "./UserSuggest";
import useSuggestions from "../../hooks/useSuggestions";

const Suggestions = () => {
    const [suggestions, setSuggestions] = useState([])
    const { fetchUsers } = useSuggestions()

    const USERS_TO_FETCH = 35

    useEffect(() => {

        const getSuggestions = async () => {
            const users = await fetchUsers(USERS_TO_FETCH)
            setSuggestions(users)
        }

        getSuggestions()
    }, [])

    const mapedSuggestions = suggestions.map(elem => <UserSuggest key={elem.uid} {...elem} />)

    return (
        <div className="max-w-[600px] w-full bg-whiteflex flex-col items-center border mt-3 py-3 rounded">
            {mapedSuggestions}
        </div>
    )
}

export default Suggestions