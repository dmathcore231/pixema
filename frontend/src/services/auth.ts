import { AxiosError } from "axios"
import { clientRest } from "../utils/client"
import { authEndPoint, refreshTokenJtwEndPoint, authenticateUserEndPoint } from "../api"
import { RequestSignIn, RequestSignUp, RequestUserData } from "../types/interfaces/UserData"

export const requestSignUp = async (body: RequestSignUp): Promise<RequestUserData> => {
  try {
    const { data } = await clientRest.post(authEndPoint, body, {
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

export const requestSignIn = async (body: RequestSignIn): Promise<RequestUserData> => {
  try {
    const { data } = await clientRest.post(authenticateUserEndPoint, body, {
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

export const requestRefreshTokenJWT = async (body: { accessToken: string }): Promise<RequestUserData> => {
  try {
    const { data } = await clientRest.post(refreshTokenJtwEndPoint, body, {
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
