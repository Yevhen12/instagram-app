export const gridCounter = (idx) => {
    const counter = 6
    return ((counter + idx) % 8) === 0 ? true : false
}