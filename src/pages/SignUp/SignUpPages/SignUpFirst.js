import React, { useState } from "react";
import * as ROUTES from '../../../constants/pagesLinks'
import { useNavigate } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebase/firebase";


const SignUpFirst = ({ setUserData, setPage }) => {

    const [textForm, setTextForm] = useState(
        {
            displayName: '',
            name: '',
            email: '',
            password: '',
        }
    )
    const [error, setError] = useState(false)
    const navigate = useNavigate()


    const changeText = (e) => {
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

    const nextPage = (e) => {
        checkEmail()
        if (!error) {
            e.preventDefault()

            const { displayName, name, email, password } = textForm

            setUserData(prevUserData => {
                return (
                    {
                        ...prevUserData,
                        displayName,
                        name,
                        email,
                        password
                    }
                )
            })
            setPage(1)
        } else {
            setTextForm(prevTextForm => {
                return (
                    {
                        ...prevTextForm,
                        email: ''
                    }
                )
            })
        }
    }

    const checkEmail = () => {
        getDocs(collection(db, "users"))
            .then(users => {
                users.forEach(user => {
                    const emailCurrentUser = user.data().email
                    console.log(emailCurrentUser)
                    if (textForm.email === emailCurrentUser) {
                        console.log("This email isnt available")
                         setError(true)
                         console.log(error)
                    }
                })
            })
    }
    

    const isInvalid = !error && textForm.displayName && textForm.name && textForm.email && textForm.password.length > 6

    return (
        <div className="flex items-center mx-auto h-screen max-w-xs">
            <div className="flex flex-col">
                <div className="flex flex-col p-7 items-center border bg-white mb-5">
                    <div className="flex justify-center w-full">
                        <img src={process.env.PUBLIC_URL + "/images/instagram.png"} className="mt-2 mb-4 w-2/4" />
                    </div>

                    {error && <p className="text-sm text-red-500 mb-5"> {error}</p>}
                    <form method="POST">
                        <input
                            name="displayName"
                            value={textForm.displayName}
                            type="text"
                            className="rounded px-4 py-3 w-full border mb-2 text-sm outline-none "
                            placeholder="Username"
                            onChange={(e) => changeText(e)}
                        />
                        <input
                            name="name"
                            value={textForm.name}
                            type="text"
                            className="rounded px-4 py-3 w-full border mb-2 text-sm outline-none "
                            placeholder="Name"
                            onChange={(e) => changeText(e)}
                        />
                        <input
                            name="email"
                            value={textForm.email}
                            type="email"
                            className="rounded px-4 py-3 w-full border mb-2 text-sm outline-none "
                            placeholder="Email address"
                            onChange={(e) => changeText(e)}
                        />
                        <input
                            name="password"
                            value={textForm.password}
                            type="password"
                            className="rounded px-4 py-3 w-full border mb-5 text-sm outline-none "
                            placeholder="Password"
                            onChange={(e) => changeText(e)}
                        />
                        <button
                            disabled={!isInvalid}
                            onClick={(e) => nextPage(e)}
                            type="submit"
                            className={`text-white w-full rounded h-8 font-semibold ${isInvalid ? 'bg-blue-500 cursor-pointer' : 'bg-blue-200 cursor-not-allowed'}`}
                        >
                            Sign up
                        </button>
                    </form>
                </div>
                <div className="w-full border flex items-center justify-center p-5">
                    <p className="mr-1">
                        Already have an account?
                    </p>
                    <button className="font-bold" type="button" onClick={() => navigate(ROUTES.SIGN_IN)}> Log In</button>
                </div>
            </div>
        </div>

    )
}


export default React.memo(SignUpFirst)