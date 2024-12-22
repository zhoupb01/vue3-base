import axios from "axios"
import { getToken, removeToken } from "@/tools"

const BASE_URL = import.meta.env.VITE_BASE_URL || ""

const request = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // unit: ms
    headers: {
        "Content-Type": "application/json",
    },
})

request.interceptors.request.use(
    config => {
        const token = getToken()
        if (token)
            config.headers.Authorization = `Bearer ${token}`
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

request.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        console.log(error.response)
        if (error.response.status === 401) {
            removeToken()
            location.reload()
        }
        return Promise.reject(error.response.data.error)
    }
)

export default request
