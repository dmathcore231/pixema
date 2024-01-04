import { AxiosError } from "axios"
import { clientRest } from "../utils/client"
import { moviesEndPoint, movieEmdPoint } from "../api"
import { Movie, ResponseMovies } from "../types/interfaces/Movie"

export const requestMovies = async (): Promise<Movie[]> => {
  try {
    const { data } = await clientRest.get(moviesEndPoint, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return data.movies
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}

export const requestCreateMovie = async (body: FormData) => {
  try {
    const { data } = await clientRest.post(movieEmdPoint, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return data
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}

export const requestGetMovieById = async (id: string): Promise<ResponseMovies> => {
  try {
    const { data } = await clientRest.get(`${movieEmdPoint}/${id}`, {
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
