import React from "react";
import * as ROUTES from '../../../../constants/pagesLinks'
import { Link } from "react-router-dom";

const UserUnlogged = () => {
    return (
        <div className="flex justify-between">
            <Link to={ROUTES.SIGN_IN}>
                <button className="py-1.5 px-3 bg-blue-500 text-white rounded text-sm font-bold mr-5">Log in</button>
            </Link>
            <Link to={ROUTES.SIGN_UP}>
                <button className="py-1.5 px-3  text-black rounded text-sm font-bold">Sign up</button>
            </Link>
        </div>
    )
}

export default UserUnlogged