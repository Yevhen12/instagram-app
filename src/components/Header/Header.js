import React from "react"
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/pagesLinks'
import SearchUsers from '../SearchUser/SearchUsers'
import UserUnlogged from "./HeaderConditions/UserUnlogged/UserUnlogged"
import UserLogged from "./HeaderConditions/UserLogged/UserLogged"
import useWindowWidth from "../../hooks/useWindowWidth"
import { auth } from "../../firebase/firebase"

const Header = () => {

    const windowWidth = useWindowWidth()
    console.log(windowWidth)
    return (
        <header className="h-16 border-b flex justify-center bg-white sticky top-0 w-full z-10 ">
            <div className="container max-w-5xl mt-3 relative pl-5 ">
                <div className="flex justify-between items-center">
                    <div className="max-w-[33%] w-full">
                        <Link to={ROUTES.HOME}>
                            <img src={process.env.PUBLIC_URL + "/images/instagram.png"} alt="instagram" className="h-10"></img>
                        </Link>
                    </div>
                    {
                         windowWidth.innerWidth > 900 ?
                            (
                                <div className="max-w-[33%] w-full h-9">
                                    <SearchUsers />
                                </div>

                            )
                            : null
                    }

                    {auth.currentUser ? <UserLogged /> : <UserUnlogged />}

                </div>
            </div>
        </header >
    )
}

export default React.memo(Header)