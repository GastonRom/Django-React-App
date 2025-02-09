import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

// importo cualquier cosa que este dentro de un archivo de variable de entorno
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

// me fijo en mi localstorage si tengo un access token, si es asi lo agrego como authorization header al request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api