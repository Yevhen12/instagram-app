import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../../../constants/pagesLinks'
import { nanoid } from 'nanoid'
import Modal from "../../../components/Modals/Modal";

const SignUpSecond = ({ setUserData, setPage, userData }) => {
    const [birthday, setBirthday] = useState(
        {
            month: '',
            day: '',
            year: '',
        }
    )
    const [activeModal, setActiveModal] = useState(false)
    const isInvalid = birthday.year && (birthday.year < 2016)


    const changeText = (e) => {
        const { title, value } = e.target
        setBirthday(prevBirthday => {
            return (
                {
                    ...prevBirthday,
                    [title]: value
                }
            )
        })
    }


    const navigate = useNavigate()
    
    const nextPage = (e) => {
        e.preventDefault()

        const { month, day, year } = birthday

        setUserData(prevUserData => {
            return (
                {
                    ...prevUserData,
                    birthday: {
                        month: month ? month : 'january',
                        day:  day ? day : 1,
                        year: year ? year : 2022,
                    },
                    imageUrl: ""
                }
            )
        })
        setPage(3)
        
    }

    const prevPage = (e) => {
        e.preventDefault()
        console.log(1)
        setPage(prevPage => prevPage - 1)
    }

    const openModal = useCallback(() => {
        setActiveModal(true)
    }, [])


    const classNameSection = 'rounded px-2 py-1 w-full border mb-5 outline-none bg-transparent cursor-pointer border-slate-400 h-10 text-slate-600 focus:border-transparent focus:text-black'
    const classNameSection2 = {
        appearance: 'none',
        backgroundImage: `url(../images/down-arrow.png)`,
        backgroundSize: '12px 12px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top 14px right 8px',
        opacity: '0.5',
        fontSize: '12px',
    }

    const arrayMonths = ['january', 'febuary', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
    const dayDependOnMonth = (birthday.month === "january" || birthday.month === "march" || birthday.month === "may" ||
        birthday.month === "july" || birthday.month === "august" || birthday.month === "october" || birthday.month === "december") ? 31 :
        (birthday.month === "april" || birthday.month === "june" || birthday.month === "september" || birthday.month === "november") ? 30 : (!(birthday.year % 4) ? 29 : 28)

    const arrayDaysDependOnMonth = Array.from({ length: dayDependOnMonth }, (v, k) => k + 1)
    const arrayOfYears = Array.from({ length: 105 }, (v, k) => 2022 - k)


    //Розглянути випадок високосного року
    const mapArrayMonths = useMemo(() => arrayMonths.map(elem => <option key={nanoid()} className='bg-white m-0 p-0' value={elem} required title={elem}>{elem}</option>), [arrayMonths])
    const mapArrayDays = useMemo(() => arrayDaysDependOnMonth.map(elem => <option key={nanoid()} className='bg-white m-0 p-0' required value={elem} title={elem}>{elem}</option>), [arrayDaysDependOnMonth])
    const mapArrayYears = useMemo(() => arrayOfYears.map(elem => <option key={nanoid()} className='bg-white m-0 p-0' required value={elem} title={elem}>{elem}</option>), [arrayOfYears])
    return (
        <div className="flex items-center mx-auto h-screen max-w-xs">
            <div className="flex flex-col">
                <div className="flex flex-col p-7 items-center border bg-white mb-5">
                    <div className="flex justify-center w-full">
                        <img src={process.env.PUBLIC_URL + "/images/birthday-auth.png"} className="mt-2 mb-4 w-2/4" />
                    </div>
                    <p className="text-base font-semibold mb-5">Chosse your birthday</p>
                    <p className="text-sm text-center">This information will not be displayed in your public profile.</p>
                    <p
                        className="text-sm text-center cursor-pointer text-sky-500 mb-3"
                        onClick={openModal}
                    >
                        Why you should indicate your birthday?
                    </p>
                    <Modal
                        activeModal={activeModal}
                        setActiveModal={setActiveModal}
                        textTitle="Birthdays"
                        styleBlock = 'bg-white w-1/5 rounded-xl duration-300 '
                    >
                        <img src={process.env.PUBLIC_URL + "/images/birthday-auth.png"} className="mt-4 mb-4 w-1/3 mr-auto ml-auto" />
                        <p className="text-center text-xl font-semibold">Birthdays in instagram</p>
                        <p className="px-10 text-center mt-3 text-sm mb-5">
                            Birthday information helps you improve the features and advertising you see,
                            and helps keep the Instagram community safe. You can view the birthday
                            in the section with personal information in the account settings.
                        </p>

                        <div className={`w-full border-t relative`}>
                            <button className="w-full" type="button" onClick={() => navigate(ROUTES.NOT_FOUND)}>
                                <p className="text-center font-semibold p-2 text-blue-500 cursor-pointer text-sm w-full">Details</p>
                            </button>
                        </div>

                    </Modal>

                    <form method="POST" className="w-full">
                        <div className="w-full flex px-5 text-base">
                            <select style={classNameSection2} className={`${classNameSection} mr-2 w-24`} value={birthday.month} title="month" onChange={(e) => changeText(e)}>
                                {mapArrayMonths}
                            </select>
                            <select style={classNameSection2} className={`${classNameSection} mr-2 w-14`} value={birthday.day} title="day" onChange={(e) => changeText(e)}>
                                {mapArrayDays}
                            </select>
                            <select style={classNameSection2} className={`${classNameSection} w-[4.5rem]`} value={birthday.year} title="year" onChange={(e) => changeText(e)}>
                                {mapArrayYears}
                            </select>
                        </div>

                        {!isInvalid && <p className="text-xs text-center text-slate-500 mb-4">Choose your birth</p>}

                        <p className="text-xs text-center mb-5 text-slate-500">Specify your birthday, even if this account is for a company, pet, etc.</p>
                        <button
                            disabled={!isInvalid}
                            onClick={(e) => nextPage(e)}
                            type="submit"
                            className={`text-white w-full rounded h-8 font-semibold ${isInvalid ? 'bg-blue-500 cursor-pointer' : 'bg-blue-200 cursor-not-allowed'}`}
                        >
                            Next
                        </button>
                        <div className="flex justify-center">
                            <button
                                onClick={(e) => prevPage(e)}
                                type="button"
                                className='text-blue-500 font-semibold cursor-pointer mt-2'
                            >
                                Back
                            </button>
                        </div>
                    </form>
                </div>
                <div className="w-full border flex items-center justify-center p-5">
                    <p className="mr-1">
                        Already have an account?
                    </p>
                    <button className="font-bold" type="button" onClick={() => navigate(ROUTES.SIGN_IN)}>Log In</button>
                </div>
            </div>
        </div>

    )
}


export default React.memo(SignUpSecond)