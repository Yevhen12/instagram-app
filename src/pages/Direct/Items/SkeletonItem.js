import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonItem = () => {
    return (
        <div className="flex pl-4 mt-2">
            <div>
                <Skeleton circle width={56} height={56} />
            </div>
            <div>
                <Skeleton width={100} height = {10} count = {2} containerClassName = 'flex flex-col items-center justify-center h-full ml-3' className="my-1" />
            </div>
        </div>
    )
}

export default React.memo(SkeletonItem)