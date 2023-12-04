import { AxiosError } from "axios"
import { clientRest } from "../utils/client"
import { moviesEndPoint } from "../api"
import { Movie } from "../types/interfaces/Movie"

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
