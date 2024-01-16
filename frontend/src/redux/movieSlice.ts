import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { requestMovies, requestCreateMovie, requestGetMovieById, requestGetMoviesByFilters } from "../services/movie"
import { Movie, MovieState, ResponseMovie, ResponseMovieByFilters } from "../types/interfaces/Movie"
import { ResponseNoData } from "../types/interfaces/UserData"
import { FormDataModalFilters } from "../types/FormDataModalFilters"

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

export const fetchGetMovieById = createAsyncThunk<ResponseMovie, string, { rejectValue: ResponseNoData }>('movies/fetchGetMovieById',
  async (id, { rejectWithValue }) => {
    try {
      return await requestGetMovieById(id)
    } catch (error) {
      const err = error as AxiosError
      const errResponse = err.response?.data as ResponseNoData
      return rejectWithValue(errResponse)
    }
  })

export const fetchGetMoviesByFilters = createAsyncThunk<ResponseMovieByFilters, FormDataModalFilters, { rejectValue: ResponseNoData }>('movies/fetchGetMoviesByFilters',
  async (filtersData, { rejectWithValue }) => {
    try {
      return await requestGetMoviesByFilters(filtersData)
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
    movie: {} as Movie,
    moviesByFilters: null,
    activeFilters: null,
  } as Partial<MovieState>,

  reducers: {
    setActiveFilters: (state, action: PayloadAction<FormDataModalFilters>) => {
      state.activeFilters = action.payload
    }
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
      state.status = 0
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

    //getMovieById
    builder.addCase(fetchGetMovieById.pending, (state) => {
      state.loading = true
      state.error = false
      state.status = 0
    })

    builder.addCase(fetchGetMovieById.fulfilled, (state, action: PayloadAction<ResponseMovie>) => {
      state.loading = false
      state.error = false
      state.status = action.payload.status
      state.message = action.payload.message
      state.movie = action.payload.movie
    })

    builder.addCase(fetchGetMovieById.rejected, (state, action) => {
      state.status = action.payload?.status
      state.message = action.payload?.message
      state.loading = false
      state.error = true
    })

    //getMoviesByFilters
    builder.addCase(fetchGetMoviesByFilters.pending, (state) => {
      state.loading = true
      state.error = false
      state.status = 0
    })

    builder.addCase(fetchGetMoviesByFilters.fulfilled, (state, action: PayloadAction<ResponseMovieByFilters>) => {
      state.loading = false
      state.error = false
      state.status = action.payload.status
      state.message = action.payload.message
      state.moviesByFilters = action.payload.movies
    })

    builder.addCase(fetchGetMoviesByFilters.rejected, (state, action) => {
      state.status = action.payload?.status
      state.message = action.payload?.message
      state.loading = false
      state.error = true
      state.moviesByFilters = null
      state.activeFilters = null
    })
  }
})

export const moviesReducer = moviesSlice.reducer
export const { setActiveFilters } = moviesSlice.actions
