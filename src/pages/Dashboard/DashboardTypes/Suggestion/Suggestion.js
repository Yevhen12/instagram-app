import React from 'react'
import Suggestions from '../../../../components/Suggestions/Suggestions'

const Suggestion = () => {

    return (
        <section className="flex flex-col items-center px-2">
            <div className="max-w-[600px] w-full mt-5">
                <p className="font-semibold">Suggestions For You</p>
            </div>
            <Suggestions />
        </section>
    )
}

export default Suggestion