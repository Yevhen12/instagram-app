const convertUnixTime = (time) => {
    let currentTimeString = 'Now';
    const timeNow = new Date(new Date().getTime() - time)

    const minutes = timeNow.getMinutes()
    const hours = Math.abs(Math.round((timeNow / 1000 / 3600)))
    const days = hours > 24 ? (hours / 24).toFixed(0) : 0
    const weeks = days > 7 ? (days / 7).toFixed(0) : 0
    const months = days > 30 ? (days / 30).toFixed(0) : 0
    const years = months > 12 ? (months / 12).toFixed(0) : 0
    const nowTime = minutes === 0 ? ' Now' : 0

    const currentTime = (years || months || weeks || days || hours || minutes || nowTime)
    currentTimeString = (currentTime === years && currentTime.toString() + ' years') || (currentTime === months && currentTime.toString() + ' months')
        || (currentTime === weeks && currentTime.toString() + ' weeks') || (currentTime === days && currentTime.toString() + ' days') ||
        (currentTime === hours && currentTime.toString() + ' hours') || (currentTime === minutes && currentTime.toString() + ' minutes') || ' Now'

        return currentTimeString
}

export default convertUnixTime