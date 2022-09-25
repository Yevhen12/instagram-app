import { ref } from 'firebase/storage'
import { storage } from '../../../../firebase/firebase'
import { setCurrentProfileUser } from '../../currentProfileUser'
import { uploadBytes, getDownloadURL } from 'firebase/storage'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../../../../firebase/firebase'
import { setUser } from '../../userActions'


export const setPostsToUser = (userRedux, post, setFirestoreCurrentUser, currentProfileUser, user, text) => async (dispatch) => {
    const { displayName, uid, imageUrl } = userRedux
    const pathName = `/images/${userRedux.uid}/posts/${post.images[0].name}`
    const fileReff = ref(storage, pathName);

    await uploadBytes(fileReff, post.images[0])

    const image = await getDownloadURL(fileReff)

    const newPost = {
        image,
        text,
        comments: [],
        likes: [],
        uid: new Date().getTime().toString(),
        user: { displayName, uid, imageUrl }
    }

    await updateDoc(doc(db, "users", userRedux.uid), {
        "posts": [...userRedux.posts, newPost]
    })

    dispatch(setUser({ ...userRedux, posts: [newPost, ...userRedux.posts] }))
    setFirestoreCurrentUser({ ...userRedux, posts: [newPost, ...userRedux.posts] })
    if ((!user || user === userRedux.displayName) && currentProfileUser.posts) {
        dispatch(setCurrentProfileUser({ ...currentProfileUser, posts: [newPost, ...currentProfileUser.posts] }))
    }

}
