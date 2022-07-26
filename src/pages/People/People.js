import React from "react";
import Header from "../../components/Header/Header";
import Suggestion from "../Dashboard/DashboardTypes/Suggestion/Suggestion";

const People = () => {
    return (
        <>
            <Header />
            <Suggestion />
        </>
    )
}

export default React.memo(People)