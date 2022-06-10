import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import * as ProfileRoutes from '../../constants/profileLinks'
import NotFound from "../NotFound";
import { setUser } from "../../redux/actions/userActions";
import { setCurrentProfileUser } from "../../redux/actions/currentProfileUser";
import { Context } from "../../context/firebaseContext";
import ReusebleModal from "../../components/ReusebleModal";

const StrangeProfileUser = () => {
    const currentProfileUserRedux = useSelector((state) => state.currentProfileUserReducer.user)
    const userRedux = useSelector((state) => state.userReducer.user)
    const { updateDoc, doc, db } = useContext(Context)
    const dispatch = useDispatch()
    const [activeModal, setActiveModal] = useState(false)


    console.log(currentProfileUserRedux)
    console.log(userRedux)

    const location = useLocation()
    const hendleFollow = async () => {
        const userFollow = currentProfileUserRedux.followers.find(elem => elem.uid === userRedux.uid)
        const currentProfileUserRef = doc(db, "users", `${currentProfileUserRedux.uid}`);
        const ReduxUserRef = doc(db, "users", `${userRedux.uid}`);

        console.log(userFollow)
        if (!userFollow?.displayName) {
            dispatch(
                setCurrentProfileUser(
                    {
                        ...currentProfileUserRedux,
                        followers: [...currentProfileUserRedux.followers, userRedux]
                    }
                )
            )
            dispatch(
                setUser(
                    {
                        ...userRedux,
                        following: [...userRedux.following, currentProfileUserRedux]
                    }
                )
            )

            await updateDoc(currentProfileUserRef, {
                "followers": [...currentProfileUserRedux.followers, userRedux]
            });

            await updateDoc(ReduxUserRef, {
                "following": [...userRedux.following, currentProfileUserRedux]
            });

        } else {

            const newFilteredArrayFollowers = currentProfileUserRedux.followers.filter(elem => elem.uid !== userRedux.uid)
            const newFilteredArrayFollowing = userRedux.following.filter(elem => elem.uid !== currentProfileUserRedux.uid)
            dispatch(
                setCurrentProfileUser(
                    {
                        ...currentProfileUserRedux,
                        followers: newFilteredArrayFollowers
                    }
                )
            )

            dispatch(
                setUser(
                    {
                        ...userRedux,
                        following: newFilteredArrayFollowing
                    }
                )
            )

            await updateDoc(currentProfileUserRef, {
                "followers": newFilteredArrayFollowers
            });

            await updateDoc(ReduxUserRef, {
                "following": newFilteredArrayFollowing
            });
        }
    }


    const isUserReduxFollowing = currentProfileUserRedux.followers && currentProfileUserRedux.followers.find(elem => elem.uid === userRedux.uid)



    return (
        <>
            {
                currentProfileUserRedux.displayName ?
                    (
                        <section className="flex justify-center">
                            <div className="container max-w-5xl mt-7 relative pl-5 pr-5 flex flex-col">
                                <div className="flex mb-10">
                                    <div className="max-w-[18rem] w-full min-w-[12rem] flex justify-center mr-5">
                                        <div className="w-36 h-36 rounded-full border overflow-hidden">
                                            <img
                                                className="w-full h-full object-cover "
                                                src={`${currentProfileUserRedux.imageUrl ? currentProfileUserRedux.imageUrl : '/images/standart-profile.png'}`}
                                                alt="profilePhoto"
                                            ></img>
                                        </div>

                                    </div>
                                    <div className="w-full">
                                        <div className="flex items-center mb-8">
                                            <p className="font-thin text-3xl mr-7 mt-0 pt-0 mb-1">{currentProfileUserRedux.displayName}</p>
                                            {
                                                isUserReduxFollowing ?
                                                    (
                                                        <>
                                                            <button
                                                                className="border rounded rounded-[0.15] px-2.5 py-1.5 text-sm font-semibold mr-2 bg-transparent text-black "
                                                                type="button"
                                                            >
                                                                Message
                                                            </button>
                                                            <button
                                                                className="border rounded rounded-[0.15] px-[1.6rem] py-1.5 text-sm font-semibold mr-2 bg-transparent text-black "
                                                                type="button"
                                                                onClick={() => setActiveModal(true)}
                                                            >
                                                                <img className="w-5 h-5" src="/images/checked-user.png" alt="checked-user" />
                                                            </button>
                                                            <ReusebleModal
                                                                activeModal={activeModal}
                                                                setActiveModal={setActiveModal}
                                                                styleForContainerBlock = "w-[25rem] flex items-center flex-col w-full"
                                                            >

                                                            </ReusebleModal>
                                                            <button className="border rounded rounded-[0.15] px-3 py-2.5 text-sm font-semibold mr-5 bg-transparent text-black" type="button">
                                                                <img className="h-3" src="/images/down-arrow-white.png" alt="arrow"></img>
                                                            </button>
                                                            <div className="h-6 w-6">
                                                                <img src="/images/option-icon.png" alt="options"></img>
                                                            </div>
                                                        </>

                                                    ) :
                                                    (
                                                        <>
                                                            <button
                                                                className="rounded rounded-[0.15] px-6 py-1.5 text-sm font-semibold mr-2 bg-[#0195f6] text-white "
                                                                type="button"
                                                                onClick={hendleFollow}
                                                            >
                                                                Follow
                                                            </button>
                                                            <button className="rounded rounded-[0.15] px-3 py-2.5 text-sm font-semibold mr-5 bg-[#0195f6] text-white" type="button">
                                                                <img className="h-3" src="/images/down-arrow-white.png" alt="arrow"></img>
                                                            </button>
                                                            <div className="h-6 w-6">
                                                                <img src="/images/option-icon.png" alt="options"></img>
                                                            </div>
                                                        </>
                                                    )
                                            }
                                        </div>
                                        <div className="flex items-center">
                                            <p className="mr-10"><span className="font-semibold">0 </span>posts</p>
                                            <p className="mr-10"><span className="font-semibold">{currentProfileUserRedux.followers.length}</span> followers</p>
                                            <p><span className="font-semibold">{currentProfileUserRedux.following.length}</span> following</p>
                                        </div>

                                    </div>
                                </div>
                                <div className="border-t w-full flex justify-center">

                                    <div
                                        className={`mr-14 opacity-50 border-t active:opacity-25 ${location.pathname === '/' + currentProfileUserRedux.displayName ? 'border-black opacity-100' : 'border-transparent'}`}
                                        data-name="posts"
                                    >
                                        <Link to={`${ProfileRoutes.POSTS}`}>
                                            <div className="h-12 flex justify-between items-center">
                                                <img className="h-3 mr-2" src="/images/grid-icon.png" alt="grid" />
                                                <p className="text-xs tracking-widest font-medium">POSTS</p>
                                            </div>
                                        </Link>
                                    </div>
                                    <div
                                        className={`mr-14 opacity-50 border-t active:opacity-25 ${location.pathname === '/' + currentProfileUserRedux.displayName + '/tagged' ? 'border-black opacity-100' : 'border-transparent'}`}
                                        data-name="tagged"
                                    >
                                        <Link to={`${ProfileRoutes.TAGGED}`}>
                                            <div className="h-12 flex justify-between items-center">
                                                <img className="h-3 mr-2" src="/images/mark-profile-icon.png" alt="profile" />
                                                <p className="text-xs tracking-widest font-medium">TAGGED</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <Outlet />
                            </div>
                        </section >
                    )
                    :
                    <NotFound />
            }
        </>
    )
}

export default StrangeProfileUser