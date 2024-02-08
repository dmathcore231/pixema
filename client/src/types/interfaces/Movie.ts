import { FormDataModalFilters } from '../FormDataModalFilters'

export type UserRating = {
  userId: string,
  rating: number
}

export interface Movie {
  _id: string,
  title: string,
  year: number,
  releaseDate: string,
  boxOffice: number,
  country: string,
  production: string,
  actors: string,
  directors: string,
  writers: string,
  rating: {
    ratingMovie: number,
    userRating: UserRating[]
  },
  imdbRating: number,
  genre: string[],
  poster: string,
  duration: number,
  description: string,
  isRecommended: boolean
}

export interface ResponseMovie {
  data: Movie,
  message: string,
  status: number
}

export interface ResponseMovies {
  data: Movie[],
  message: string,
  status: number,
  isAuth: string | null
}

export interface ResponseMovieByFilters extends ResponseMovies {
  filters: FormDataModalFilters
}

export interface MovieState {
  loading: boolean,
  error: boolean,
  movies: Movie[],
  status: number,
  message: string,
  movie: Movie | null
  moviesByFilters: Movie[] | null
  activeFilters: FormDataModalFilters | null
  moviesBySearch: Movie[] | null
  searchValue: string | null
  favoritesMovies: Movie[] | null
  recommendedMovies: Movie[] | null
}

export interface RequestMovieSetRating {
  formSetRatingMovie: {
    userId: string,
    rating: number,
    remove: boolean
  }
}
