import React, {useContext} from "react";
import { Context } from "../../../context/firebaseContext";
import { setUser } from "../../../redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";

const UserVisitedItem = ({ user, redirectToAnotherUser, recentUsers, setRecentUsers }) => {
    const userRedux = useSelector(state => state.userReducer.user)
    const dispatch = useDispatch()
    const {doc, db, updateDoc} = useContext(Context)

    const clearVisitedUser = async (uid, e) => {
        e.stopPropagation()
        const ReduxUserRef = doc(db, "users", `${userRedux.uid}`);
        const filteredArrayVisitedUsers = userRedux.recentVisitedUsers.filter(elem => elem.uid !== uid)
        dispatch(setUser(
            {
                ...userRedux,
                recentVisitedUsers: [...filteredArrayVisitedUsers]
            }
        ))
        setRecentUsers(filteredArrayVisitedUsers)
        await updateDoc(ReduxUserRef, {
            "recentVisitedUsers": [...filteredArrayVisitedUsers]
        });
    }


    return (
        <li className="py-1.5 pl-4 hover:bg-gray-100/50 cursor-pointer" onClick={() => redirectToAnotherUser(user)}>
            <div className="flex justify-left items-center">
                <div className="w-[2.75rem] h-[2.75rem] rounded-full overflow-hidden mt-1 mr-3">
                    <img
                        className="w-full h-full object-cover"
                        src={`${user.imageUrl ? user.imageUrl : '/images/standart-profile.png'}`}
                        alt="UserPhoto"
                    />
                </div>
                <div className="w-[15.5rem] pr-5">
                    <p className="font-semibold text-sm">
                        {user.displayName}
                    </p>
                </div>
                <button type="button" className="p-1" onClick={(e) => clearVisitedUser(user.uid, e)}>
                    <img alt="close" src="/images/close-icon.png" className="w-3.5 h-3.5 opacity-60" />
                </button>
            </div>
        </li>
    )
}

export default React.memo(UserVisitedItem)