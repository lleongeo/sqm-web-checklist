import { authContext, endpoint } from './../config/adalConfig'

const login = () => authContext.login()
const loggedIn = () => this.getUser() ? true : false
const logout = () => authContext.logOut()
const getToken = () => authContext.getCachedToken(endpoint)
const getUser = () => authContext.getCachedUser()

export {
    login,
    loggedIn,
    logout,
    getToken,
    getUser,
}
