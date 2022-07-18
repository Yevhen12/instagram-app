import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../context/firebaseContext";
import { useSelector } from "react-redux";
import UserSuggest from "./UserSuggest";

const Suggestions = () => {
    const userRedux = useSelector(state => state.userReducer.user)
    const [suggestions, setSuggestions] = useState([])

    const { db, collection, getDocs } = useContext(Context)

    useEffect(() => {
        console.log(1)
        const getSuggestions = async () => {
            const usersRef = collection(db, "users");

            const usersSnap = await getDocs(usersRef)
            console.log(usersSnap.docs)
            const arrayAllUsers = usersSnap.docs.map(elem => elem.data())
            const mapedUsersSnap = arrayAllUsers.filter(elem => elem.uid !== userRedux.uid && userRedux.following.every(followUser => followUser.uid !== elem.uid))
                .slice(0, 35).sort(() => 0.5 - Math.random())

            setSuggestions(mapedUsersSnap)
        }

        getSuggestions()
    }, [])

    const mapedSuggestions = suggestions.map(elem => <UserSuggest  key={elem.uid} {...elem} />)

    console.log(suggestions)
    return (
        <section className="flex flex-col items-center px-2">
            <div className="max-w-[600px] w-full mt-5">
                <p className="font-semibold">Suggestions For You</p>
            </div>
            <div className="max-w-[600px] w-full bg-whiteflex flex-col items-center border mt-3 py-3 rounded">
                {mapedSuggestions}
            </div>
        </section>
    )
}

export default Suggestions