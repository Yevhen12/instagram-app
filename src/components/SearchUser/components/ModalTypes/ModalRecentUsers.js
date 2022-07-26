import React, {useContext, useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Context } from "../../../../context/firebaseContext";
import { setUser } from "../../../../redux/actions/userActions";
import UserVisitedItem from "../UserVisitedItem";
import DropMenu from "../../../DropMenu/DropMenu";
import Loading from "../../../Loaders/Loaging";

const ModalRecentUsers = ({ activeModal, setActiveModal, redirectToAnotherUser }) => {

    const userRedux = useSelector(state => state.userReducer.user)
    const [recentUsers, setRecentUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    const {db, doc, updateDoc, getDoc} = useContext(Context)

    const clearAllVisitedUsers = async () => {
        const ReduxUserRef = doc(db, "users", `${userRedux.uid}`);
        dispatch(setUser(
            {
                ...userRedux,
                recentVisitedUsers: []
            }
        ))
        setRecentUsers([])

        await updateDoc(ReduxUserRef, {
            "recentVisitedUsers": []
        });
    }

    useEffect(() => {
        setIsLoading(true)
        const getRecentUsers = async () => {
            const userRef = doc(db, 'users', userRedux.uid)
            const userDoc = await getDoc(userRef)

            setRecentUsers(userDoc.data().recentVisitedUsers)
            setIsLoading(false)
        }

        getRecentUsers()
    }, [])

    
    const mapRecentVisitedUsers = recentUsers.map(elem => <UserVisitedItem key={elem.uid} user={elem} recentUsers={recentUsers} setRecentUsers={setRecentUsers} redirectToAnotherUser={redirectToAnotherUser} />)

    return (
        <DropMenu
            styleForWindowBlock="w-full h-full fixed top-0 left-0 flex justify-center items-center z-10 cursor-default "
            dropMenuProfile={activeModal}
            setDropMenuProfile={setActiveModal}
            styleForContainerBlock={`absolute w-[23.4rem] h-[22.6rem] shadow-defaultModal rounded bg-white flex top-14 right-3 p-0 m-0 z-20`}
            styleForInnerBlock='flex flex-col w-full overflow-y-scroll'
        >
            <div className="flex justify-between pt-5 px-4">
                <p className="font-semibold">Recent</p>
                <button type="button" className="text-sm font-semibold text-[#0195f6]" onClick={() => clearAllVisitedUsers()}>Clear all</button>
            </div>
            <ul className="pt-2">
                {isLoading ? <div className="h-[270px]"><Loading height={30} width={30} /></div>: mapRecentVisitedUsers}
                {recentUsers.length === 0 && !isLoading && <p className="text-sm p-4 font-semibold">No recent searches.</p>}
            </ul>
        </DropMenu>
    )
}

export default React.memo(ModalRecentUsers)