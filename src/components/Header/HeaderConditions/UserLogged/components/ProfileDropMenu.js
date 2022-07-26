import React, {useContext} from "react";
import * as ROUTES from '../../../../../constants/pagesLinks'
import * as ProfileLinks from '../../../../../constants/profileLinks'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ItemDropMenu from "../../../../DropMenu/Items/ItemDropMenu";
import { Context } from "../../../../../context/firebaseContext";
import { setUser } from "../../../../../redux/actions/userActions";
import DropMenu from "../../../../DropMenu/DropMenu";


const ProfileDropMenu = ({dropMenuProfile, setDropMenuProfile}) => {

    const userRedux = useSelector(state => state.userReducer.user)

    const {signOut, auth,setFirestoreCurrentUser, firestoreCurrentUser} = useContext(Context)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userSignOut = async () => {
        setFirestoreCurrentUser(
            {
                displayName: '',
                name: '',
                email: '',
                password: '',
                imageUrl: '',
                birthday: {
                    year: '',
                    day: '',
                    month: '',
                },
                uid: '',
                followers: [],
                following: [],
                posts: [],
                savedPosts: [],
                recentVisitedUsers: [],
            }
        )
        dispatch(setUser(firestoreCurrentUser))
        await signOut(auth)
    }

    const redirectToSaved = () => {
        navigate(`/${userRedux.displayName}/${ProfileLinks.SAVED}`)
        setDropMenuProfile(false)
    }

    const openProfileUser = () => {
        setDropMenuProfile(false)
    }

    return (
        <DropMenu
        styleForWindowBlock="w-full h-full fixed top-0 left-0 flex justify-center items-center z-20 cursor-default "
        styleForContainerBlock='absolute w-60 shadow-defaultModal rounded bg-white flex items-center top-12 right-0 p-0 m-0 z-30 '
        styleForInnerBlock='flex items-center flex-col w-full'
        dropMenuProfile={dropMenuProfile}
        setDropMenuProfile={setDropMenuProfile}
    >

        <ItemDropMenu
            imageUrl='../images/user-icon.png'
            text='Profile'
            action={openProfileUser}
            style='leading-[2.7rem] hover:bg-slate-50 w-full flex-1 text-sm relative pl-12'
            link={`/${userRedux.displayName}`}
        />

        <ItemDropMenu
            imageUrl='../images/save-icon.png'
            text='Saved'
            action={redirectToSaved}
            style='leading-[2.7rem] hover:bg-slate-50 w-full flex-1 text-sm relative pl-12'
            link={`/${userRedux.displayName}`}

        />
        <ItemDropMenu
            imageUrl='../images/settings-icon.png'
            text='Settings'
            action={userSignOut}
            style='leading-[2.7rem] hover:bg-slate-50 w-full flex-1 text-sm relative pl-12'
            link={`/${userRedux.displayName}`}
        />
        <ItemDropMenu
            imageUrl='../images/exchange-icon.png'
            text='Change user'
            action={userSignOut}
            style='leading-[2.7rem] hover:bg-slate-50 w-full flex-1 text-sm relative pl-12'
            link={`/${userRedux.displayName}`}
        />
        <ItemDropMenu
            imageUrl={null}
            text='Exit'
            action={userSignOut}
            style='leading-[2.7rem] hover:bg-slate-50 w-full flex-1 text-sm relative pl-12'
            link={ROUTES.SIGN_IN}
        />
    </DropMenu>
    )
}

export default React.memo(ProfileDropMenu)