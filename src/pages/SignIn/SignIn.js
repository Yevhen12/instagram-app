import React, { useState, useContext } from "react";
import * as ROUTES from '../../constants/pagesLinks'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from "../../context/firebaseContext";
import { setUser } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";


const SignIn = () => {

    const [textForm, setTextForm] = useState(
        {
            email: '',
            password: ''
        }
    )

    const dispatch = useDispatch()


    const [error, setError] = useState()
    const navigate = useNavigate()
    const { signInWithEmailAndPassword, auth, doc, db, getDoc } = useContext(Context)


    const changetextForm = (e) => {
        const { name, value } = e.target
        setTextForm(prevTextForm => {
            return (
                {
                    ...prevTextForm,
                    [name]: value
                }
            )
        })
    }

    const navigateToSignUp = () => {
        console.log(1)
        navigate(ROUTES.SIGN_UP)
    }

    const signIn = async (e) => {
        e.preventDefault()
        const { email, password } = textForm
        const loggedUser = await signInWithEmailAndPassword(auth, email, password)
        const docUser = await getDoc(doc(db, 'users', loggedUser.user.uid))

        dispatch(setUser(docUser.data()))

        navigate('/')

    }
    return (
        <div className="flex max-w-screen-lg items-center mx-auto h-screen">
            <div className="flex w-2/3">
                <img src={process.env.PUBLIC_URL + "/images/backgroundPhonesInstagram.png"} alt="iPhone with Instagram app" className="h-full" />
            </div>
            <div className="flex flex-col w-1/3">
                <div className="flex flex-col p-7 items-center border bg-white mb-5">
                    <div className="flex justify-center w-full">
                        <img src={process.env.PUBLIC_URL + "/images/instagram.png"} className="mt-2 mb-4 w-2/4" />
                    </div>
                    {error && <p className="text-sm text-red-500 mb-5"> {error.message}</p>}
                    <form method="POST">
                        <input
                            value={textForm.email}
                            name="email"
                            type="email"
                            className="rounded px-4 py-3 w-full border mb-2 text-sm outline-none "
                            placeholder="Email address"
                            onChange={(e) => changetextForm(e)}
                        />
                        <input
                            value={textForm.password}
                            name="password"
                            type="password"
                            className="rounded px-4 py-3 w-full border mb-5 text-sm outline-none "
                            placeholder="Password"
                            onChange={(e) => changetextForm(e)}
                        />

                        <button
                            type="submit"
                            className="bg-blue-500 text-white w-full rounded h-8 font-bold"
                            onClick={(e) => signIn(e)}
                        >
                            Log In
                        </button>

                    </form>
                </div>
                <div className="w-full border flex items-center justify-center p-5">
                    <p className="mr-1">
                        Don't have an account?
                    </p>
                    <button className="font-bold" type="button" onClick={navigateToSignUp}>Sign up</button>
                </div>
            </div>
        </div>
    )
}

export default React.memo(SignIn)