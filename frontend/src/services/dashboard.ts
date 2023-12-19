import { AxiosError } from "axios"
import { ResponseNoData } from "../types/interfaces/UserData"
import { RequestDashboard, ResponseAllUsers } from "../types/interfaces/Dashboard"
import { dashboardEndPoint, authAllUsersEndPoint } from "../api"
import { clientRest } from "../utils/client"

export const requestDashboard = async (body: RequestDashboard): Promise<ResponseNoData> => {
  try {
    const { data } = await clientRest.post(dashboardEndPoint, body, {
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
