import { AxiosError } from "axios"
import { clientRest } from "../utils/client"
import { moviesEndPoint, movieEndPoint, moviesFiltersEndPoint, moviesSearchEndPoint, favoriteMovieEndPoint, moviesRecommendedEndPoint, movieRatingEndPoint } from "../api"
import { ResponseMovie, ResponseMovieByFilters, ResponseMovies, RequestMovieSetRating } from "../types/interfaces/Movie"
import { FormDataModalFilters } from "../types/FormDataModalFilters"

export const requestMovies = async (): Promise<ResponseMovies> => {
  try {
    const { data } = await clientRest.get(moviesEndPoint, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return data
  } catch (error) {
    const err = error as AxiosError
    throw err
  }
}

export const requestCreateMovie = async (body: FormData) => {
  try {
    const { data } = await clientRest.post(movieEndPoint, body, {
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
    const { data } = await clientRest.get(`${movieEndPoint}/${id}`, {
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

export const requestGetMoviesByFilters = async (filtersData: FormDataModalFilters): Promise<ResponseMovieByFilters> => {
  try {
    const genreValues = filtersData.genre.map((genre) => genre.value)
    const countryValues = filtersData.country.map((country) => country.value)
    const { data } = await clientRest.get(moviesFiltersEndPoint, {
      params: {
        sort: filtersData.sort!.value,
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

export const requestGetMoviesBySearch = async (search: string): Promise<ResponseMovies> => {
  try {
    const { data } = await clientRest.get(moviesSearchEndPoint, {
      params: {
        value: search
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

export const requestUpdateMovieById = async ({ formUpdateMovie: { id, body } }: { formUpdateMovie: { id: string, body: FormData } }): Promise<ResponseMovie> => {
  try {
    const { data } = await clientRest.put(`${movieEndPoint}/${id}`, body, {
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

export const requestFavoritesMovies = async (): Promise<ResponseMovies> => {
  try {
    const { data } = await clientRest.get(favoriteMovieEndPoint, {
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

export const requestDeleteMovieById = async (id: string): Promise<ResponseMovie> => {
  try {
    const { data } = await clientRest.delete(`${movieEndPoint}/${id}`, {
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

export const requestGetRecommendedMovies = async (movieId: string): Promise<ResponseMovies> => {
  try {
    const { data } = await clientRest.get(`${moviesRecommendedEndPoint}/${movieId}`, {
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

export const requestSetMovieRating = async (body: RequestMovieSetRating, id: string): Promise<ResponseMovie> => {
  try {
    const { data } = await clientRest.post(`${movieRatingEndPoint}/${id}`, body, {
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
