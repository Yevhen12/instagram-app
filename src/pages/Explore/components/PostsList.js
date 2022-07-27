import React, {useMemo} from "react";
import PostItem from "./PostItem";
import { Outlet } from "react-router-dom";

const PostsList = ({allPosts}) => {

    const mapedPosts = useMemo(() => allPosts.map((elem, idx) => <PostItem key={elem.uid} idx={idx} post={elem} />), [allPosts])

    return (
        <>
            <section className="flex justify-center w-full">
                <div className="container max-w-5xl mt-3 relative pl-5">
                    <div className="grid sm:gap-3 lg:gap-7 gap-1 grid-cols-3 grid-cols-3 auto-cols-[300px] auto-rows-auto mt-3">
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

export default React.memo(PostsList)