import { httpService } from "./http.service.js"

const BASE_URL = 'auth/'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    updateScore,
    getEmptyCredentials
}

async function login({ username, password }) {

    const user = await httpService.post(BASE_URL + 'login', { username, password })
    console.log('user FETCH:', user)

    if (user) return _setLoggedinUser(user)
    else return 'Invalid login'
}

async function signup({ username, password, fullname }) {
    const user = { username, password, fullname, score: 10000 }

    const userToSignup = await httpService.post(BASE_URL + 'signup', user)
    
    if (userToSignup) return _setLoggedinUser(userToSignup)
    else return Promise.reject('Invalid signup')

}

async function logout() {
    await httpService.post(BASE_URL + 'logout')
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
}

async function updateScore(diff) {
    if (getLoggedinUser().score + diff < 0) return 'No credit'

    const user = await httpService.put('/api/user', { diff })

    console.log('updateScore user:', user)
    _setLoggedinUser(user)
    return user.score
}

async function getById(userId) {
    const { data } = await axios.get('/api/user/' + userId)
    return data
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}

// Test Data
// userService.signup({username: 'bobo', password: 'bobo', fullname: 'Bobo McPopo'})
// userService.login({username: 'bobo', password: 'bobo'})



