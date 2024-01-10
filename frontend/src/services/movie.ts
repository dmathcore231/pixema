import { AxiosError } from "axios"
import { clientRest } from "../utils/client"
import { moviesEndPoint, movieEmdPoint, moviesFiltersEndPoint } from "../api"
import { Movie, ResponseMovie, ResponseMovies } from "../types/interfaces/Movie"
import { FormDataModalFilters } from "../types/FormDataModalFilters"

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

export const requestGetMovieById = async (id: string): Promise<ResponseMovie> => {
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

export const requestGetMoviesByFilters = async (filtersData: FormDataModalFilters): Promise<ResponseMovies> => {
  try {
    const genreValues = filtersData.genre.map((genre) => genre.value)
    const countryValues = filtersData.country.map((country) => country.value)
    const { data } = await clientRest.get(moviesFiltersEndPoint, {
      params: {
        sort: filtersData.sort.value,
        title: filtersData.title,
        genre: genreValues,
        'years[from]': filtersData.years.from,
        'years[to]': filtersData.years.to,
        'rating[from]': filtersData.rating.from,
        'rating[to]': filtersData.rating.to,
        country: countryValues
      },
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
