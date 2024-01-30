import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { requestMovies, requestCreateMovie, requestGetMovieById, requestGetMoviesByFilters, requestGetMoviesBySearch, requestUpdateMovieById, requestFavoritesMovies } from "../services/movie"
import { Movie, MovieState, ResponseMovie, ResponseMovieByFilters, ResponseMovies } from "../types/interfaces/Movie"
import { ResponseNoData } from "../types/interfaces/UserData"
import { FormDataModalFilters } from "../types/FormDataModalFilters"
import { setDataLocalStorage } from "../helpers"

export const fetchMovies = createAsyncThunk<ResponseMovies, void, { rejectValue: ResponseNoData }>('movies/fetchMovies',
  async (_, { rejectWithValue }) => {
    try {
      return await requestMovies()
    } catch (error) {
      const err = error as AxiosError
      const errResponse = err.response?.data as ResponseNoData
      return rejectWithValue(errResponse)
    }
  })

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

export const fetchUpdateMovieById = createAsyncThunk<ResponseMovie, { id: string, body: FormData }, { rejectValue: ResponseNoData }>('movies/fetchUpdateMovieById',
  async ({ id, body }, { rejectWithValue }) => {
    try {
      return await requestUpdateMovieById(id, body)
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

export const fetchGetMoviesBySearch = createAsyncThunk<ResponseMovies, string, { rejectValue: ResponseNoData }>('movies/fetchGetMoviesBySearch',
  async (search, { rejectWithValue }) => {
    try {
      return await requestGetMoviesBySearch(search)
    } catch (error) {
      const err = error as AxiosError
      const errResponse = err.response?.data as ResponseNoData
      return rejectWithValue(errResponse)
    }
  })

export const fetchGetFavoritesMovies = createAsyncThunk<ResponseMovies, void, { rejectValue: ResponseNoData }>('user/fetchFavoritesMovies',
  async (_, { rejectWithValue }) => {
    try {
      return await requestFavoritesMovies()
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
    moviesBySearch: null,
    searchValue: null,
    favoritesMovies: null,
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

    builder.addCase(fetchMovies.fulfilled, (state, action: PayloadAction<ResponseMovies>) => {
      state.loading = false
      state.error = false
      state.movies = action.payload.data
      state.status = action.payload.status
      state.message = action.payload.message

      if (action.payload.isAuth) {
        setDataLocalStorage('accessToken', action.payload.isAuth)
      } else {
        setDataLocalStorage('accessToken', null)
      }
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
      state.moviesByFilters = action.payload.data
    })

    builder.addCase(fetchGetMoviesByFilters.rejected, (state, action) => {
      state.status = action.payload?.status
      state.message = action.payload?.message
      state.loading = false
      state.error = true
      state.moviesByFilters = null
      state.activeFilters = null
    })

    //getMoviesBySearch
    builder.addCase(fetchGetMoviesBySearch.pending, (state) => {
      state.loading = true
      state.error = false
      state.status = 0
    })

    builder.addCase(fetchGetMoviesBySearch.fulfilled, (state, action: PayloadAction<ResponseMovies>) => {
      state.loading = false
      state.error = false
      state.status = action.payload.status
      state.message = action.payload.message
      state.moviesBySearch = action.payload.data
    })

    builder.addCase(fetchGetMoviesBySearch.rejected, (state, action) => {
      state.status = action.payload?.status
      state.message = action.payload?.message
      state.loading = false
      state.error = true
      state.moviesBySearch = null
    })

    //updateMovie
    builder.addCase(fetchUpdateMovieById.pending, (state) => {
      state.loading = true
      state.error = false
      state.status = 0
    })

    builder.addCase(fetchUpdateMovieById.fulfilled,
      (state, action: PayloadAction<ResponseMovie>) => {
        state.loading = false
        state.error = false
        state.status = action.payload.status
        state.message = action.payload.message
        state.movie = action.payload.movie
      })

    builder.addCase(fetchUpdateMovieById.rejected, (state, action) => {
      state.status = action.payload?.status
      state.message = action.payload?.message
      state.loading = false
      state.error = true
    })

    //getFavoriteMovies
    builder.addCase(fetchGetFavoritesMovies.pending, (state) => {
      state.loading = true
      state.error = false
      state.status = 0
    })

    builder.addCase(fetchGetFavoritesMovies.fulfilled, (state, action: PayloadAction<ResponseMovies>) => {
      state.loading = false
      state.error = false
      state.status = action.payload.status
      state.message = action.payload.message
      state.favoritesMovies = action.payload.data
    })

    builder.addCase(fetchGetFavoritesMovies.rejected, (state, action) => {
      state.status = action.payload?.status
      state.message = action.payload?.message
      state.loading = false
      state.error = true
      state.favoritesMovies = null
    })
  }

})

export const moviesReducer = moviesSlice.reducer
export const { setActiveFilters } = moviesSlice.actions
