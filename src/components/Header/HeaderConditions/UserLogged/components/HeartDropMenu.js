import React, { useEffect, useState, useContext, useMemo } from "react";
import DropMenu from "../../../../DropMenu/DropMenu";
import { useSelector } from "react-redux";
import { Context } from "../../../../../context/firebaseContext";
import Activity from "./HeartModalComponents/Activity";
import Loading from "../../../../Loaders/Loaging";

const HeartDropMenu = ({ dropMenuHeart, setDropMenuHeart }) => {

    const [allActivities, setAllActivities] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { doc, db, getDoc } = useContext(Context)
    const userRedux = useSelector(state => state.userReducer.user)


    useEffect(() => {
        setIsLoading(true)
        const getActivities = async () => {

            const userRef = doc(db, 'users', userRedux.uid)
            const userDoc = await getDoc(userRef)

            const userData = userDoc.data()

            const postsAllLikes = []
            const allFollowers = userData.followers.map(elem => ({ ...elem, type: 'follower' }))
            const postsAllComments = []

            userData.posts.forEach(elem => {
                const postLikes = elem.likes.filter(elemLike => elemLike.uid !== userRedux.uid).map(elemLike => ({ ...elemLike, type: 'like', user: { ...elem.user }, post: { uid: elem.uid, imageUrl: elem.image } }))
                const postComments = elem.comments.filter(elemComment => elemComment.userUid !== userRedux.uid).map(elemComment => ({ ...elemComment, type: 'comment', likes: { ...elemComment.likes }, user: { ...elem.user }, post: { uid: elem.uid, imageUrl: elem.image } }))
                postsAllLikes.push(...postLikes)
                postsAllComments.push(...postComments)
            })

            const activities = [...postsAllLikes, ...allFollowers, ...postsAllComments].sort((a, b) => b.createdAt - a.createdAt)
            setAllActivities(activities)
            setIsLoading(false)
        }

        getActivities()
    }, [dropMenuHeart])

    console.log(1)

    const mappedActivities = useMemo(() => allActivities.map((elem, idx) => <Activity key={idx} activity={elem} />), [allActivities])

    return (
        <DropMenu
            styleForWindowBlock="w-full h-full fixed top-0 left-0 flex justify-center items-center z-20 cursor-default "
            styleForContainerBlock={`absolute w-[24rem] sm:w-[32rem] ${isLoading ? 'h-[9rem]' : 'h-[18rem]'} shadow-defaultModal rounded bg-white flex items-center top-10 -right-10 p-0 m-0 z-30 cursor-pointer`}
            styleForInnerBlock='flex items-center flex-col w-full h-full'
            dropMenuProfile={dropMenuHeart}
            setDropMenuProfile={setDropMenuHeart}
        >
            {
                allActivities.length > 0 ?
                    (
                        <>
                            <ul className="flex flex-col p-4 overflow-y-auto w-full">
                                <p className="font-semibold w-full text-sm">Your activities</p>
                                {isLoading ? <div className="mt-3"><Loading height={30} width={30} /></div>: mappedActivities}
                            </ul>
                        </>
                    )
                    :
                    (
                        <div className="flex items-center justify-center flex-col h-full">
                            <div className="relative">
                                <img alt="circle" src="/images/circle-contor.png" className="h-14 w-14" />
                                <img alt="heart" src="/images/heart-uncolored.png" className="h-7 w-7 absolute top-3.5 left-3.5" />
                            </div>
                            <p className="text-sm mt-3">Activity On Your Posts</p>
                            <p className="text-sm max-w-[420px] text-center mt-3">When someone likes or comments on one of your posts, you'll see it here.</p>
                        </div>
                    )
            }

        </DropMenu>
    )
}

export default React.memo(HeartDropMenu)