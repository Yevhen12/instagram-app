import { setUser } from "../redux/actions/userActions";
import { setCurrentProfileUser } from "../redux/actions/currentProfileUser";
import { useDispatch, useSelector } from "react-redux";
import { createUnixTime } from "../helpers/createUnixTime";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";


const useFollow = (currentProfileUser) => {
    const { imageUrl, uid, name, displayName } = currentProfileUser
    const dispatch = useDispatch()

    const userRedux = useSelector((state) => state.userReducer.user)
    const UserThatInPage = useSelector((state) => state.currentProfileUserReducer.user)

    const hendleFollow = async () => {

        const userFollow = userRedux.following.find(elem => elem.uid === uid)
        const currentProfileUserRef = doc(db, "users", `${uid}`);
        const ReduxUserRef = doc(db, "users", `${userRedux.uid}`);
        if (UserThatInPage.uid === uid) {
            if (!userFollow?.displayName) {
                dispatch(
                    setCurrentProfileUser(
                        {
                            ...UserThatInPage,
                            followers: [...UserThatInPage.followers,
                            {
                                displayName: userRedux.displayName,
                                imageUrl: userRedux.imageUrl,
                                name: userRedux.name,
                                uid: userRedux.uid,
                                createdAt: createUnixTime()
                            }
                            ]
                        }
                    )
                )
                dispatch(
                    setUser(
                        {
                            ...userRedux,
                            following: [...userRedux.following, { displayName, imageUrl, name, uid, createdAt: createUnixTime() }]
                        }
                    )
                )

                await updateDoc(currentProfileUserRef, {
                    "followers": [...UserThatInPage.followers,
                    {
                        displayName: userRedux.displayName,
                        imageUrl: userRedux.imageUrl,
                        name: userRedux.name,
                        uid: userRedux.uid,
                        createdAt: createUnixTime()
                    }]
                });

                await updateDoc(ReduxUserRef, {
                    "following": [...userRedux.following, { displayName, imageUrl, name, uid, createdAt: createUnixTime() }]
                });

            } else {

                const newFilteredArrayFollowers = UserThatInPage.followers.filter(elem => elem.uid !== userRedux.uid)
                const newFilteredArrayFollowing = userRedux.following.filter(elem => elem.uid !== UserThatInPage.uid)
                console.log(newFilteredArrayFollowers)
                console.log(newFilteredArrayFollowing)
                dispatch(
                    setCurrentProfileUser(
                        {
                            ...UserThatInPage,
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
        } else {
            const docSnap = await getDoc(currentProfileUserRef);
            const strangeUser = docSnap.data()
            if (!userFollow?.displayName) {
                dispatch(
                    setUser(
                        {
                            ...userRedux,
                            following: [...userRedux.following, { displayName, imageUrl, name, uid, createdAt: createUnixTime() }]
                        }
                    )
                )

                await updateDoc(currentProfileUserRef, {
                    "followers": [...strangeUser.followers,
                    {
                        displayName: userRedux.displayName,
                        imageUrl: userRedux.imageUrl,
                        name: userRedux.name,
                        uid: userRedux.uid,
                        createdAt: createUnixTime()
                    }]
                });

                await updateDoc(ReduxUserRef, {
                    "following": [...userRedux.following, { displayName, imageUrl, name, uid, createdAt: createUnixTime() }]
                });

            } else {
                const newFilteredArrayFollowers = strangeUser.followers.filter(elem => elem.uid !== userRedux.uid)
                const newFilteredArrayFollowing = userRedux.following.filter(elem => elem.uid !== strangeUser.uid)

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
    }

    return { hendleFollow }

}

export default useFollow