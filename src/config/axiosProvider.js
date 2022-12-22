import axios from "axios"
import { authProvider } from "./authProvider"

axios.interceptors.request.use(
    async (config) => {
        const accessTokenResponse = await authProvider.getAccessToken()
        config.headers.Authorization = `Bearer ${accessTokenResponse.accessToken}`
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
