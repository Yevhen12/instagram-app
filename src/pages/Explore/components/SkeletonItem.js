import React from "react";
import Skeleton from "react-loading-skeleton";
import { SkeletonTheme } from "react-loading-skeleton";
import { gridCounter } from "../../../helpers/gridCounter";

const SkeletonItem = ({idx}) => {
    const isBigPost = gridCounter(idx + 1)
    return (
        <SkeletonTheme baseColor='#d6d6d6' highlightColor='#e3e3e3'>
            <section className="flex justify-center w-full">
                <div className="container max-w-5xl mt-3 relative pl-5">
                    <div className="grid grid-cols-3 gap-7 auto-rows-[300px] auto-cols-[300px] mt-3">
                        <Skeleton containerClassName={`${isBigPost ? 'row-span-2 col-span-2' : 'row-span-1 col-span-1'}`} />
                    </div>
                </div>
            </section>
        </SkeletonTheme>
    )
}

export default React.memo(SkeletonItem)