import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { requestMovies } from "../services/movie"
import { Movie, MovieState } from "../types/interfaces/Movie"


export const fetchMovies = createAsyncThunk('movies/fetchMovies',
  async () => {
    return await requestMovies()
  }
)

export const moviesSlice = createSlice({
  name: 'movies',

  initialState: {
    loading: false,
    error: false,
    movies: [] as Movie[],
  } as MovieState,

  reducers: {
  },

  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state) => {
      state.loading = true
    })

    builder.addCase(fetchMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
      state.loading = false
      state.error = false
      state.movies = action.payload
    })

    builder.addCase(fetchMovies.rejected, (state) => {
      state.loading = false
      state.error = true
    })
  }
})

export const moviesReducer = moviesSlice.reducer
