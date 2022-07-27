import { useState, useEffect } from "react"
import { getWindowSize } from "../helpers/getWindowWidth"

const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState()

    useEffect(() => {
        const handleWindowResize = () =>  {
            setWindowWidth(getWindowSize());
        }
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
    }, [])


    return windowWidth ? windowWidth : getWindowSize()
}

export default useWindowWidth