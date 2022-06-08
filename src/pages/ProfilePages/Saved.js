import React from "react";

const Saved = () => {
    return (
        <div className="mt-10">
            <div className="flex justify-between">
                <p className="text-xs opacity-50">Only you can see what you've saved</p>
                <button className="text-sky-500 text-sm font-semibold" type = "button">+ New collection</button>
            </div>

            <div>
                <p className="mt-32 text-xl text-center opacity-50 italic">Here can be your saved photos and videos</p>
            </div>
        </div>
    )
}

export default Saved