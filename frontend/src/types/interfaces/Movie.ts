
export interface Movie {
  _id: string,
  title: string,
  year: number,
  rating: number,
  imdbId: number,
  genre: string[],
  poster: string,
  description: string,
}

export interface MovieResponse {
  movies: Movie[],
}

export interface MovieState {
  loading: boolean,
  error: boolean,
  movies: Movie[],
  status: number,
  message: string,
}
