export const USER_KEY = 'user'
export const JWT_KEY = 'jwt'

/**
 * 
 * @param {string} key 
 * @param {*} value 
 */
export function setLocalStorage(key, value) {

    const stringValue = JSON.stringify(value)
    localStorage.setItem(key, stringValue)
}

export function getLocalStorage(key) {
    const stringValue = localStorage.getItem(key)

    return JSON.parse(stringValue)
}