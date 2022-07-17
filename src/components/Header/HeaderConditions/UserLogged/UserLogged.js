import React, { useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { Context } from "../../../../context/firebaseContext";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../../../redux/actions/userActions";
import * as ROUTES from '../../../../constants/pagesLinks'
import { useLocation } from "react-router-dom";
import PostModal from "../../../AddPost/MainModal/PostModal";
import ProfileDropMenu from "./components/ProfileDropMenu";
import HeartDropMenu from "./components/HeartDropMenu";

const UserLogged = () => {

    const { firestoreCurrentUser } = useContext(Context)

    const userRedux = useSelector((state) => state.userReducer.user)
    const location = useLocation()

    const [dropMenuProfile, setDropMenuProfile] = useState(false)
    const [dropMenuHeart, setDropMenuHeart] = useState(false)
    const [addPostModal, setAddPostModal] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setUser(firestoreCurrentUser))
    }, [firestoreCurrentUser])

    const dropMenuHendler = () => {
        setDropMenuProfile(true)
    }

    const dropHeartMenuHendler = () => {
        setDropMenuHeart(true)
    }

    const addPostModalHendler = () => {
        setAddPostModal(prevAddPostModal => !prevAddPostModal)
    }

    const isActiveModals = dropMenuProfile || dropMenuHeart || addPostModal

    return (
        <div className="flex justify-between items-center">
            <div className="mr-6 cursor-pointer">
                <Link to={ROUTES.HOME}>
                    <img
                        data-name="home"
                        src={`/images/home-${location.pathname === '/' && !isActiveModals ? '' : 'un'}colored.png`}
                        alt="home"
                        className="h-6"
                    >
                    </img>
                </Link>
            </div>
            <div className="mr-6 cursor-pointer">
                <Link to={`${ROUTES.DIRECT}`}>
                    <img
                        data-name="messenger"
                        src={`/images/messenger-${location.pathname.includes(ROUTES.DIRECT) && !isActiveModals ? '' : 'un'}colored.png`}
                        alt="messenger"
                        className="h-6"
                    >
                    </img>
                </Link>
            </div>
            <div className="mr-6 cursor-pointer" onClick={addPostModalHendler}>
                <img data-name="add"
                    src={`/images/add-${addPostModal ? '' : 'un'}colored.png`}
                    alt="add"
                    className="h-6"
                >
                </img>
                <PostModal activeModal={addPostModal} setActiveModal={addPostModalHendler} />
            </div>
            <div className="mr-6 cursor-pointer">
                <Link to={ROUTES.EXPLORE}>
                    <img
                        data-name="compass"
                        src={`/images/compass-${location.pathname === ROUTES.EXPLORE && !isActiveModals ? '' : 'un'}colored.png`}
                        alt="compass"
                        className="h-6"
                    >
                    </img>
                </Link>
            </div>
            <div className="mr-6 cursor-pointer relative">
                <img
                    data-name="heart"
                    src={`/images/heart-${dropMenuHeart ? '' : 'un'}colored.png`}
                    alt="heart"
                    className="h-6"
                    onClick={dropHeartMenuHendler}
                >
                </img>
                <HeartDropMenu dropMenuHeart = {dropMenuHeart} setDropMenuHeart = {setDropMenuHeart} />
            </div>
            <div className="mr-6 cursor-pointer box-border relative">

                <button
                    className={`rounded-full overflow-hidden mt-1 border p-0.5 h-[1.9rem] w-[1.9rem] 
                ${(location.pathname === '/' + userRedux.displayName || dropMenuProfile || location.pathname.includes('saved')
                            || (location.pathname.includes('tagged') && location.pathname.includes(userRedux.displayName))) && !dropMenuHeart && !addPostModal ? 'border-black' : 'border-transparent'}`}
                    data-name="profile"
                    onClick={dropMenuHendler}
                >
                    <img
                        src={userRedux.imageUrl ? userRedux.imageUrl : '/images/standart-profile.png'}
                        className="w-full h-full object-cover overflow-hidden rounded-full "
                        alt="profile"
                    />
                </button>

                <ProfileDropMenu dropMenuProfile={dropMenuProfile} setDropMenuProfile = {setDropMenuProfile} />

            </div>

        </div>
    )
}

export default UserLogged