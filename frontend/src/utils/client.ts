import axios, { AxiosInstance } from 'axios'
import { getDataLocalStorage } from '../helpers'

export const clientRest: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000
})

export const client: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5173',
  timeout: 5000
})

const accessToken = getDataLocalStorage('accessToken')

if (accessToken) {
  clientRest.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
}
