import { async } from "@firebase/util";
import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Context } from "../context/firebaseContext";
import { setUser } from "../redux/actions/userActions";

const ModalChangePicture = ({ activeModal, setActiveModal }) => {

    const { ref, storage, uploadBytes, auth, getDownloadURL, doc, db, updateDoc, getDoc, deleteObject, setFirestoreCurrentUser } = useContext(Context)
    const userRedux = useSelector((state) => state.userReducer.user)
    const dispatch = useDispatch()

    const hendleChange = async (e) => {

        setActiveModal(false)

        const currentUser = auth.currentUser
        const userUID = currentUser.uid
        const currentFile = e.target.files[0]
        const pathName = `/images/${userUID}/avatar/${currentFile.name}`
        const fileReff = ref(storage, pathName);

        if (userRedux.imageUrl) {
            await deleteObject(ref(storage, userRedux.imageUrl))
        }

        await uploadBytes(fileReff, currentFile)

        const imageUrl = await getDownloadURL(ref(storage, pathName))

        const currentData = doc(db, 'users', `${currentUser.uid}`)

        await updateDoc(currentData, {
            "imageUrl": `${imageUrl}`
        })

        setFirestoreCurrentUser({ ...userRedux, imageUrl: imageUrl })
        dispatch(setUser({ ...userRedux, imageUrl: imageUrl }))

    }

    const deleteImage = async () => {

        setActiveModal(false)

        await deleteObject(ref(storage, userRedux.imageUrl))

        setFirestoreCurrentUser({ ...userRedux, imageUrl: "" })
        dispatch(setUser({ ...userRedux, imageUrl: "" }))
        
    }



    const closeModal = () => {
        setActiveModal(false)
    }


    return (
        <div
            onClick={() => closeModal()}
            className={`w-full h-full bg-black/60 fixed top-0 left-0 flex justify-center items-center z-10 duration-300 ${activeModal ? 'opacity-1 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-white w-1/5 rounded-xl duration-300  ${activeModal ? 'scale-100' : 'scale-50'}`}
            >
                <div className="pt-7 pb-7 border-b">
                    <p className="text-lg font-semibold text-center">Change profile photo</p>
                </div>
                <label className="cursor-pointer w-full pt-3 pb-3 text-sm font-bold text-sky-600 block text-center">
                    Upload Photo
                    <input
                        type="file"
                        onChange={hendleChange}
                        className="hidden"
                    />
                </label>
                <button
                    disabled={userRedux.imageUrl ? false : true}
                    className={`w-full pt-3 pb-3 text-sm font-bold text-red-500 border-t ${!userRedux.imageUrl && 'cursor-not-allowed text-red-200'}`}
                    onClick = {deleteImage}
                >
                    Remove current photo
                </button>
                <button
                    className="w-full pt-3 pb-3 text-sm border-t"
                    onClick={closeModal}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default ModalChangePicture