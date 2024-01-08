
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

export interface MovieState {
  loading: boolean,
  error: boolean,
  movies: Movie[],
  status: number,
  message: string,
  movie: Movie
}
