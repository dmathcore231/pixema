import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { RequestSignUp, RequestSignIn, UserState, RequestUserData, ResponseNoData, RequestUpdateUserData, RequestUserDataAuthorization } from "../types/interfaces/UserData"
import { requestSignUp, requestSignIn, requestUserData, requestUpdateUserData, requestUpdateFavoriteMovie } from "../services/auth"
import { setDataLocalStorage } from "../helpers"

export const fetchUserRegistration = createAsyncThunk<RequestUserDataAuthorization, RequestSignUp, { rejectValue: ResponseNoData }>('user/fetchUserRegistration',
  async (body: RequestSignUp, { rejectWithValue }) => {
    try {
      return await requestSignUp(body)
    } catch (error) {
      const err = error as AxiosError
      const errResponse = err.response?.data as ResponseNoData
      return rejectWithValue(errResponse)
    }
  })

export const fetchUserAuthorization = createAsyncThunk<RequestUserDataAuthorization, RequestSignIn, { rejectValue: ResponseNoData }>('user/fetchUserAuthorization',
  async (body: RequestSignIn, { rejectWithValue }) => {
    try {
      return await requestSignIn(body)
    } catch (error) {
      const err = error as AxiosError
      const errResponse = err.response?.data as ResponseNoData
      return rejectWithValue(errResponse)
    }
  })

export const fetchUserData = createAsyncThunk<RequestUserData, { accessToken: string }, { rejectValue: ResponseNoData }>('user/fetchUserData',
  async (body: { accessToken: string }, { rejectWithValue }) => {
    try {
      return await requestUserData(body)
    } catch (error) {
      const err = error as AxiosError
      const errResponse = err.response?.data as ResponseNoData
      return rejectWithValue(errResponse)
    }
  })

export const fetchUpdateUserData = createAsyncThunk<RequestUserData, RequestUpdateUserData, { rejectValue: ResponseNoData }>('user/fetchUpdateUserData',
  async (body: RequestUpdateUserData, { rejectWithValue }) => {
    try {
      return await requestUpdateUserData(body)
    } catch (error) {
      const err = error as AxiosError
      const errResponse = err.response?.data as ResponseNoData
      return rejectWithValue(errResponse)
    }
  })

export const fetchUpdateFavoriteMovie = createAsyncThunk<RequestUserData, { movieId: string }, { rejectValue: ResponseNoData }>('user/fetchUpdateFavoriteMovie',
  async (body: { movieId: string }, { rejectWithValue }) => {
    try {
      return await requestUpdateFavoriteMovie(body)
    } catch (error) {
      const err = error as AxiosError
      const errResponse = err.response?.data as ResponseNoData
      return rejectWithValue(errResponse)
    }
  })

export const userSlice = createSlice({
  name: 'user',

  initialState: {
    accessToken: null,
    user: null,
    status: 0,
    error: false,
    loading: false,
    message: '',
    def: false,
  } as Partial<UserState>,

  reducers: {
    logout: (state) => {
      state.accessToken = null
      state.user = null
      state.status = 0
      state.error = false
      state.loading = false
      state.message = ''
      setDataLocalStorage('accessToken', null)
    },

    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUserRegistration.pending, (state) => {
      state.loading = true
      state.error = false
    })

    builder.addCase(fetchUserRegistration.fulfilled, (state, action: PayloadAction<RequestUserDataAuthorization>) => {
      state.status = action.payload.status
      state.loading = false
      state.error = false
      state.message = ''
    })

    builder.addCase(fetchUserRegistration.rejected, (state, action) => {
      state.status = action.payload?.status
      state.loading = false
      state.error = true
      state.message = action.payload?.message
    })

    // Authorization
    builder.addCase(fetchUserAuthorization.pending, (state) => {
      state.loading = true
      state.error = false
    })

    builder.addCase(fetchUserAuthorization.fulfilled, (state, action: PayloadAction<RequestUserDataAuthorization>) => {
      state.status = action.payload.status
      state.loading = false
      state.error = false
      state.accessToken = action.payload.accessToken
      state.user = action.payload.user
      state.message = action.payload.message

      if (action.payload.accessToken) {
        setDataLocalStorage('accessToken', action.payload.accessToken)
      } else {
        setDataLocalStorage('accessToken', null)
      }

      if (action.payload.user && action.payload.user._role === 'admin') {
        state.def = true
      } else {
        state.def = false
      }

      if (action.payload.refreshToken) {
        document.cookie = `refreshToken=${action.payload.refreshToken}; max-age=604800; samesite=strict; domain=.localhost; secure;`
      }
    })

    builder.addCase(fetchUserAuthorization.rejected, (state, action) => {
      state.status = action.payload?.status
      state.loading = false
      state.error = true
      state.message = action.payload?.message
      state.accessToken = null
      setDataLocalStorage('accessToken', null)
    })

    builder.addCase(fetchUserData.pending, (state) => {
      state.loading = true
      state.error = false
    })

    builder.addCase(fetchUserData.fulfilled, (state, action: PayloadAction<RequestUserData>) => {
      state.status = action.payload.status
      state.loading = false
      state.error = false
      state.user = action.payload.data
      state.message = ''
    })

    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.status = action.payload?.status
      state.loading = false
      state.error = true
      state.message = action.payload?.message
    })

    builder.addCase(fetchUpdateUserData.pending, (state) => {
      state.loading = true
      state.error = false
    })

    builder.addCase(fetchUpdateUserData.fulfilled, (state, action: PayloadAction<RequestUserData>) => {
      state.status = action.payload.status
      state.loading = false
      state.error = false
      state.user = action.payload.data
      state.message = ''
    })

    builder.addCase(fetchUpdateUserData.rejected, (state, action) => {
      state.status = action.payload?.status
      state.loading = false
      state.error = true
      state.message = action.payload?.message
    })

    builder.addCase(fetchUpdateFavoriteMovie.pending, (state) => {
      state.loading = true
      state.error = false
      state.status = 0
    })

    builder.addCase(fetchUpdateFavoriteMovie.fulfilled, (state, action: PayloadAction<RequestUserData>) => {
      state.status = action.payload.status
      state.loading = false
      state.error = false
      state.user = action.payload.data
      state.message = action.payload.message
    })

    builder.addCase(fetchUpdateFavoriteMovie.rejected, (state, action) => {
      state.status = action.payload?.status
      state.loading = false
      state.error = true
      state.message = action.payload?.message
    })
  },
})

export const userReducer = userSlice.reducer
export const { logout, setAccessToken } = userSlice.actions
