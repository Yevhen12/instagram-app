import React from "react";
import {TailSpin} from 'react-loader-spinner'


const Loading = ({height, width}) => {
    return (
        <div className="flex items-center justify-center h-full w-full">
            <TailSpin height={height} width ={width} color = 'rgba(120,120,120,150)' ariaLavel = 'Loading' />
        </div>
    )
}

export default React.memo(Loading)