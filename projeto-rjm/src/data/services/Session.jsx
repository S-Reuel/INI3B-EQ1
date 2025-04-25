export function onSession(key, dd){
    localStorage.setItem(key, dd)
}

export function offSession(key){
    localStorage.removeItem(key)
}