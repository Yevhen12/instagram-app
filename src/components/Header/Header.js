import React, { useContext } from "react"
import { Link } from 'react-router-dom'
import { Context } from "../../context/firebaseContext"
import * as ROUTES from '../../constants/pagesLinks'
import SearchUsers from '../SearchUser/SearchUsers'
import UserUnlogged from "./HeaderConditions/UserUnlogged/UserUnlogged"
import UserLogged from "./HeaderConditions/UserLogged/UserLogged"
import { useSelector } from "react-redux"
import Loading from "../../pages/Loading/Loading"

const Header = () => {

    const { auth } = useContext(Context)

    const isLoading = useSelector(state => state.isLoadingReducer.isLoading)
    return (
        <header className="h-16 border-b flex justify-center bg-white sticky top-0 w-full z-10 ">
            <div className="container max-w-5xl mt-3 relative pl-5 ">
                <div className="flex justify-between items-center">
                    <div className="max-w-[33%] w-full">
                        <Link to={ROUTES.HOME}>
                            <img src="/images/instagram.png" alt="instagram" className="h-10"></img>
                        </Link>
                    </div>
                    <div className="max-w-[33%] w-full h-9">
                        <SearchUsers />
                    </div>

                    {auth.currentUser ? <UserLogged /> : <UserUnlogged />}

                </div>
            </div>
        </header >
    )
}

export default Header