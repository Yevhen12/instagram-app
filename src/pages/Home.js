import React from "react";
import Header from "../components/Header";

const Home = () => {
    window.onload = function () {window.location.reload()}
    return (
        <div className="bg-[#fafafa]">
            <Header />
            <h1>Its home</h1>
        </div>
    )
}

export default Home