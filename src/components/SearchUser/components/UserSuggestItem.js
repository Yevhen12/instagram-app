import React from "react";

const UserSuggestItem = ({user, redirectToAnotherUser}) => {
    return (
        <li className="py-1.5 pl-4 hover:bg-gray-100/50 cursor-pointer" onClick={() => redirectToAnotherUser(user)}>
            <div className="flex justify-between items-center">
                <div className="w-[2.75rem] h-[2.75rem] rounded-full overflow-hidden mt-1">
                    <img
                        className="w-full h-full object-cover"
                        src={`${user.imageUrl ? user.imageUrl : process.env.PUBLIC_URL + '/images/standart-profile.png'}`}
                        alt="UserPhoto"
                    />
                </div>
                <div className="w-[17.8rem] pr-5">
                    <p className="font-semibold text-sm">
                        {user.displayName}
                    </p>
                </div>
            </div>
        </li>
    )
}

export default React.memo(UserSuggestItem)