import { AxiosError } from "axios"
import { ResponseNoData } from "../types/interfaces/UserData"
import { RequestDashboard, ResponseAllUsers, ResponseUserDataById, RequestUpdateUserData } from "../types/interfaces/Dashboard"
import { dashboardEndPoint, authAllUsersEndPoint, dashboardGetUserByIdEndPoint } from "../api"
import { clientRest } from "../utils/client"

export const requestDashboard = async (body: RequestDashboard): Promise<ResponseNoData> => {
  try {
    const { data } = await clientRest.post(dashboardEndPoint, body, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
    return data
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}

export const requestGetAllUsers = async (): Promise<ResponseAllUsers> => {
  try {
    const { data } = await clientRest.get(authAllUsersEndPoint, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return data
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}

export const requestGetUserById = async (userId: string): Promise<ResponseUserDataById> => {
  try {
    const { data } = await clientRest.get(`${dashboardGetUserByIdEndPoint}/${userId}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return data
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}

export const requestUpdateUserData = async (body: RequestUpdateUserData): Promise<ResponseUserDataById> => {
  try {
    const { data } = await clientRest.put(`${dashboardGetUserByIdEndPoint}/${body.userId}`, body, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return data
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}

export const requestDeleteUser = async (userId: string): Promise<ResponseNoData> => {
  try {
    const { data } = await clientRest.delete(`${dashboardGetUserByIdEndPoint}/${userId}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return data
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}
