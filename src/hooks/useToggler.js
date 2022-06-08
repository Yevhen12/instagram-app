import { useState } from "react"
const useToggler = (defaultValue = false) => {
    const [active, setActive] = useState(defaultValue)

    const toggleActive = () => {
        setActive(prevActive => !prevActive)
    }
    return  [active, toggleActive]
}

export default useToggler