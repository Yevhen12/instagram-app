import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import Timeline from './Timeline/Timeline'
import useWindowWidth from '../../../../hooks/useWindowWidth'


const Main = () => {
    const windowWidth = useWindowWidth()
    return (
        <div className='flex justify-center mt-7 px-3'>
            <Timeline />
            {
                windowWidth.innerWidth > 768 ?
                    (
                        <Sidebar />
                    )
                    : null
            }

        </div>
    )
}

export default React.memo(Main)