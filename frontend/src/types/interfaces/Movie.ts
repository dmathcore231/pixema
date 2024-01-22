import { FormDataModalFilters } from '../FormDataModalFilters'
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
  rating: number,
  imdbRating: number,
  genre: string[],
  poster: string,
  duration: number,
  description: string,
  isRecommended: boolean
}

export interface ResponseMovie {
  movie: Movie,
  message: string,
  status: number
}

export interface ResponseMovies {
  movies: Movie[],
  message: string,
  status: number
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
  movie: Movie
  moviesByFilters: Movie[] | null
  activeFilters: FormDataModalFilters | null
  moviesBySearch: Movie[] | null
  searchValue: string | null
  favoritesMovies: Movie[] | null
}
