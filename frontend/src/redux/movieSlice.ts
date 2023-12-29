import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { requestMovies, requestCreateMovie } from "../services/movie"
import { Movie, MovieState } from "../types/interfaces/Movie"
import { ResponseNoData } from "../types/interfaces/UserData"

export const fetchMovies = createAsyncThunk('movies/fetchMovies',
  async () => {
    return await requestMovies()
  }
)
export const fetchCreateMovie = createAsyncThunk<ResponseNoData, FormData, { rejectValue: ResponseNoData }>('movies/fetchCreateMovie',
  async (body: FormData, { rejectWithValue }) => {
    try {
      return await requestCreateMovie(body)
    } catch (error) {
      const err = error as AxiosError
      const errResponse = err.response?.data as ResponseNoData
      return rejectWithValue(errResponse)
    }
  })

export const moviesSlice = createSlice({
  name: 'movies',

  initialState: {
    loading: false,
    error: false,
    movies: [] as Movie[],
    status: 0,
    message: '',
  } as Partial<MovieState>,

  reducers: {
  },

  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state) => {
      state.loading = true
      state.error = false
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

    //createMovie
    builder.addCase(fetchCreateMovie.pending, (state) => {
      state.loading = true
      state.error = false
    })

    builder.addCase(fetchCreateMovie.fulfilled, (state, action: PayloadAction<ResponseNoData>) => {
      state.loading = false
      state.error = false
      state.status = action.payload.status
      state.message = action.payload.message
    })

    builder.addCase(fetchCreateMovie.rejected, (state, action) => {
      state.status = action.payload?.status
      state.message = action.payload?.message
      state.loading = false
      state.error = true
    })
  }
})

export const moviesReducer = moviesSlice.reducer
