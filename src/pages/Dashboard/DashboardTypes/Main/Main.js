import React from 'react'
import Suggestion from '../Suggestion/Suggestion'
import Sidebar from './Sidebar/Sidebar'
import Timeline from './Timeline/Timeline'

const Main = () => {
    return (
        <div className='flex justify-center mt-7'>
            <Timeline />
            <Sidebar />
        </div>
    )
}

export default React.memo(Main)