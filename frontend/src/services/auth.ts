import { clientRest } from "../utils/client"
import { authEndPoint } from "../api"
import { AxiosResponse } from "axios";
import { ResponseDataUser, RequestUsersData, UserData } from "../types/interfaces/UserData"

export const requestSignUp = async (body: ResponseDataUser): Promise<AxiosResponse<UserData>> => {
  try {
    const { data } = await clientRest.post(authEndPoint, body, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const requestSignIn = async (body: ResponseDataUser): Promise<AxiosResponse<RequestUsersData>> => {
  try {
    const data = await clientRest.post(authEndPoint, body, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}
