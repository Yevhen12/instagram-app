import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ItemDropMenu = ({ text, style, imageUrl, action, link }) => {
    const styleImage = {
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: '15px 15px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top 15px left 15px'
    }
    const styleExit = {
        paddingLeft: '15px',
        borderTop: '1px solid rgb(220, 220, 220)',
    }

    return (

        <div onClick={action} style={imageUrl ? styleImage : styleExit} className={`${style}`}>
            {
                link ?
                    (
                        <Link to={link}>
                            <p>{text}</p>
                        </Link>
                    )
                    :
                    (
                        <p>{text}</p>
                    )
            }

        </div>

    )

}

export default React.memo(ItemDropMenu)