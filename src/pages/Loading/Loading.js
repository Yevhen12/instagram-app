import React from "react";

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-between h-[100vh]">
            <div className="h-6"></div>
            <div>
                <img alt="instagram" src={process.env.PUBLIC_URL + "/images/instagram-colored-icon.png"} className="h-16"/>
            </div>
            <div>
                <img alt="instagram" src={process.env.PUBLIC_URL + "/images/from-meta-icon.png"} className="mb-6" />
            </div>
        </div>
    )
}

export default React.memo(Loading)