import React, { useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { Context } from "../context/firebaseContext";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/actions/userActions";
import { setActiveIconHome } from "../redux/actions/iconAction";
import * as ROUTES from '../constants/links'
import ItemDropMenu from "../components/ItemDropMenu";
import DropMenu from "../components/DropMenu";
import { HeaderStyles } from "../styles/Header";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
    const { user, getDoc, db, doc, setFirestoreCurrentUser, firestoreCurrentUser, signOut, auth } = useContext(Context)

    const userRedux = useSelector((state) => state.userReducer.user)
    const navigate = useNavigate()
    const location = useLocation()

    const [dropMenuProfile, setDropMenuProfile] = useState(false)
    const [dropMenuHeart, setDropMenuHeart] = useState(false)
    const [addPostModal, setAddPostModal] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setUser(firestoreCurrentUser))
    }, [firestoreCurrentUser, user])



    const userSignOut = () => {
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
            }
        )
        dispatch(setUser(firestoreCurrentUser))
        signOut(auth)
            .then(data => console.log("Sign out complete"))
            .catch(error => {
                console.log(error.message)
            })
    }


    const openProfileUser = () => {
        //console.log(userRedux.displayName)
    }
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
        <header className="h-16 border-b flex justify-center bg-white">
            <div className="container max-w-5xl mt-3 relative pl-5">
                <div className="flex justify-between items-center">
                    <Link to={ROUTES.HOME}>
                        <div className="cursor-pointer">
                            <img src="/images/instagram.png" className="h-10"></img>
                        </div>
                    </Link>
                    {auth.currentUser ?
                        (
                            <div className="flex justify-between items-center">
                                {/* <Link to={ROUTES.SIGN_IN}>
                                    <button onClick={userSignOut}>Sign out, {userRedux.displayName}</button>
                                </Link> */}
                                <div className="mr-6 cursor-pointer">
                                    <Link to={ROUTES.HOME}>
                                        <img
                                            data-name="home"
                                            src={`/images/home-${location.pathname === '/' && !isActiveModals ? '' : 'un'}colored.png`}
                                            className="h-6"
                                        >
                                        </img>
                                    </Link>
                                </div>
                                <div className="mr-6 cursor-pointer">
                                    <Link to={`${ROUTES.DIRECT}`}>
                                        <img
                                            data-name="messenger"
                                            src={`/images/messenger-${location.pathname === ROUTES.DIRECT && !isActiveModals ? '' : 'un'}colored.png`}
                                            className="h-6"
                                        >
                                        </img>
                                    </Link>
                                </div>
                                <div className="mr-6 cursor-pointer" onClick={addPostModalHendler}>
                                    <img data-name="add"
                                        src={`/images/add-${addPostModal ? '' : 'un'}colored.png`}
                                        className="h-6"
                                    >
                                    </img>
                                </div>
                                <div className="mr-6 cursor-pointer">
                                    <Link to={ROUTES.EXPLORE}>
                                        <img
                                            data-name="compass"
                                            src={`/images/compass-${location.pathname === ROUTES.EXPLORE && !isActiveModals ? '' : 'un'}colored.png`}
                                            className="h-6"
                                        >
                                        </img>
                                    </Link>
                                </div>
                                <div className="mr-6 cursor-pointer">
                                    <img
                                        data-name="heart"
                                        src={`/images/heart-${dropMenuHeart ? '' : 'un'}colored.png`}
                                        className="h-6"
                                        onClick={dropHeartMenuHendler}
                                    >
                                    </img>

                                    <DropMenu
                                        styleForContainerBlock={`absolute w-[32rem] h-[23rem] shadow-defaultModal rounded bg-white flex items-center top-14 right-[29.5rem] p-0 m-0 z-20 cursor-pointer`}
                                        styleForInnerBlock='flex items-center flex-col w-full'
                                        dropMenuProfile={dropMenuHeart}
                                        setDropMenuProfile={setDropMenuHeart}

                                    >
                                        <div className="flex items-center justify-center flex-col">
                                            <img className="h-10 opacity-30" src="/images/search-icon.png"></img>
                                            <p className="text-sm mt-2 italic text-gray-400">No info yet</p>
                                        </div>
                                    </DropMenu>



                                </div>
                                <div className="mr-6 cursor-pointer box-border ">

                                    <button
                                        className={`rounded-full overflow-hidden mt-1 border p-0.5 h-[1.9rem] w-[1.9rem] ${(location.pathname === '/' + userRedux.displayName || dropMenuProfile) && !dropMenuHeart && !addPostModal ? 'border-black' : 'border-transparent'}`}
                                        data-name="profile"
                                        onClick={dropMenuHendler}
                                    >
                                        {/* {activeIcon.profile && <img src="/images/circle-contor.png" className="h-7 absolute"></img>} */}
                                        <img src={userRedux.imageUrl ? userRedux.imageUrl : '/images/standart-profile.png'} className="w-full h-full object-cover overflow-hidden rounded-full "></img>
                                    </button>


                                    <DropMenu
                                        styleForContainerBlock='absolute w-60 shadow-defaultModal rounded bg-white flex items-center top-14 right-[28rem] p-0 m-0 z-20'
                                        styleForInnerBlock='flex items-center flex-col w-full'
                                        dropMenuProfile={dropMenuProfile}
                                        setDropMenuProfile={setDropMenuProfile}
                                    >

                                        <ItemDropMenu
                                            imageUrl='../images/user-icon.png'
                                            text='Profile'
                                            action={openProfileUser}
                                            style={HeaderStyles.itemDropItem}
                                            link={`/${userRedux.displayName}`}
                                        />

                                        <ItemDropMenu
                                            imageUrl='../images/save-icon.png'
                                            text='Saved'
                                            action={userSignOut}
                                            style={HeaderStyles.itemDropItem}
                                            link={`/${userRedux.displayName}`}
                                        />
                                        <ItemDropMenu
                                            imageUrl='../images/settings-icon.png'
                                            text='Settings'
                                            action={userSignOut}
                                            style={HeaderStyles.itemDropItem}
                                            link={`/${userRedux.displayName}`}
                                        />
                                        <ItemDropMenu
                                            imageUrl='../images/exchange-icon.png'
                                            text='Change user'
                                            action={userSignOut}
                                            style={HeaderStyles.itemDropItem}
                                            link={`/${userRedux.displayName}`}
                                        />
                                        <ItemDropMenu
                                            imageUrl={null}
                                            text='Exit'
                                            action={userSignOut}
                                            style={HeaderStyles.itemDropItem}
                                            link={ROUTES.SIGN_IN}
                                        />
                                    </DropMenu>
                                </div>


                            </div>

                        )
                        :
                        (
                            <div className="flex justify-between">
                                <Link to={ROUTES.SIGN_IN}>
                                    <button className="py-1.5 px-3 bg-blue-500 text-white rounded text-sm font-bold mr-5">Log in</button>
                                </Link>
                                <Link to={ROUTES.SIGN_UP}>
                                    <button className="py-1.5 px-3  text-black rounded text-sm font-bold">Sign up</button>
                                </Link>
                            </div>
                        )
                    }

                </div>
            </div>
        </header>
    )
}

export default Header