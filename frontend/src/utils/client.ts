import axios, { AxiosInstance } from 'axios'

export const clientRest: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000
})

export const client: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5173',
  timeout: 5000
})
