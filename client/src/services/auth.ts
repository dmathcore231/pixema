import { AxiosError } from "axios"
import { clientRest } from "../utils/client"
import { authEndPoint, authenticateUserEndPoint, favoriteMovieEndPoint } from "../api"
import { RequestSignIn, RequestSignUp, RequestUserData, RequestUpdateUserData, RequestUserDataAuthorization } from "../types/interfaces/UserData"

export const requestSignUp = async (body: RequestSignUp): Promise<RequestUserDataAuthorization> => {
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

export const requestSignIn = async (body: RequestSignIn): Promise<RequestUserDataAuthorization> => {
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

export const requestUpdateFavoriteMovie = async (body: { movieId: string }): Promise<RequestUserData> => {
  try {
    const { data } = await clientRest.post(favoriteMovieEndPoint, body, {
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

