import axios, { AxiosInstance } from 'axios'
import { getDataLocalStorage } from '../helpers'

export const clientRest: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000
})

clientRest.interceptors.request.use(
  (config) => {
    const token = getDataLocalStorage('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)
