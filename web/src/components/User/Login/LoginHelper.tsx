function saveUserTokenTime() {
    let currentTime = new Date()
    let currentTimeList = [
        currentTime.getUTCFullYear(),
        currentTime.getUTCMonth(),
        currentTime.getUTCDate(),
        currentTime.getUTCHours(),
    ]
    localStorage.setItem('user_token_time', JSON.stringify(currentTimeList))
}

function readUserTokenTime() {
    let token_time_data = localStorage.getItem('user_token_time')
    if (token_time_data !== null) {
        return JSON.parse(token_time_data)
    } else {
        return null
    }
}

export function saveDataToLocalStorage(email: string, access_token: string) {
    localStorage.setItem('user_email', email)
    localStorage.setItem('user_token', access_token)
    saveUserTokenTime()
}


export function checkValidToken() {
    let timeList = readUserTokenTime()
    if (timeList === null) {
        return false
    }
    let currentTime = new Date()
    let tokenTime = Date.UTC(
        timeList[0],
        timeList[1],
        timeList[2],
        timeList[3],
        0,
        0,
        0
    )
    let diff_ms = currentTime.getTime() - tokenTime
    // token is valid for 6 hours
    let diff_hours = diff_ms / 1000 / 60 / 60
    if (diff_hours <= 6) {
        return true
    }
    return false
}

export function DeleteLocalStorage() {
    localStorage.removeItem('user_email')
    localStorage.removeItem('user_token')
    localStorage.removeItem('user_token_time')
    console.log('local storage cleared')
    window.location.reload()
}
