import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

const apiUrl = "https://aa8f5973-f3d4-44af-b7d6-8c8c24bc707d-dev.e1-us-east-azure.choreoapis.dev/djangoreactproject/backend/v1"

// importo cualquier cosa que este dentro de un archivo de variable de entorno
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
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