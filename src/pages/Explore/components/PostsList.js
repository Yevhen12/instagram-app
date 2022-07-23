import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useSuggestions from "../../../hooks/useSuggestions";
import PostItem from "./PostItem";
import { Outlet } from "react-router-dom";

const PostsList = ({allPosts}) => {

    const mapedPosts = allPosts.map((elem, idx) => <PostItem key={elem.uid} idx={idx} post={elem} />)

    return (
        <>
            <section className="flex justify-center w-full">
                <div className="container max-w-5xl mt-3 relative pl-5">
                    <div className="grid grid-cols-3 gap-7 auto-rows-[300px] auto-cols-[300px] mt-3">
                        {mapedPosts}
                    </div>
                </div>
            </section>

            {
                allPosts.length > 0 && <Outlet context={{ posts: allPosts }} />
            }

        </>
    )
}

export default PostsList