export function onSession(key, dd, email){
    localStorage.setItem(key, dd)
    localStorage.setItem('authEmail', email)
}

export function offSession(key){
    localStorage.removeItem(key)
}