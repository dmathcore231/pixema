import { clientRest } from "../utils/client"
import { moviesEndPoint } from "../api"
import { Movie } from "../types/interfaces/Movie"

export const requestMovies = async (): Promise<Movie[]> => {
  const { data } = await clientRest.get(moviesEndPoint)
  return data
}
