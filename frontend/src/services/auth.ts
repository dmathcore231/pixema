import { AxiosError } from "axios"
import { clientRest } from "../utils/client"
import { authEndPoint, refreshTokenJtwEndPoint, authenticateUserEndPoint } from "../api"
import { RequestSignIn, RequestSignUp, RequestUserData, RequestUpdateUserData } from "../types/interfaces/UserData"
import { setDataLocalStorage } from "../helpers"

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
        'Content-Type': 'application/json',
        Authorization: `Bearer ${body.accessToken}`
      }
    })
    setDataLocalStorage('accessToken', data.accessToken)
    return data
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}

export const requestUserData = async (body: { accessToken: string }): Promise<RequestUserData> => {
  try {
    const { data } = await clientRest.get(authEndPoint, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${body.accessToken}`
      }
    })
    return data
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}

export const requestUpdateUserData = async (body: RequestUpdateUserData): Promise<RequestUserData> => {
  try {
    const { data } = await clientRest.put(authEndPoint, body, {
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
