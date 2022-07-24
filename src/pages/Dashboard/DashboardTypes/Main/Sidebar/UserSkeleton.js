import React from "react";
import Skeleton from "react-loading-skeleton";

const UserSkeleton = () => {
    return (
        <div className="flex items-center my-2 h-[35px]">
            <div>
                <Skeleton circle width={32} height={32} />
            </div>
            <div className="w-full h-full">
                <Skeleton width={100} height={6} count={2} containerClassName='flex flex-col mt-2.5 ml-3' className="mb-2" />
            </div>
            <div className="h-full">
                <Skeleton height={8} width={40} className='mr-3 mt-2' />
            </div>
        </div>
    )
}

export default UserSkeleton