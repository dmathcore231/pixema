import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { RequestSignUp, RequestSignIn, UserData, UserState, RequestUserData, ErrorResponse } from "../types/interfaces/UserData"
import { requestSignUp, requestSignIn, requestRefreshTokenJWT, requestUserData } from "../services/auth"
import { setDataLocalStorage } from "../helpers"

export const fetchUserRegistration = createAsyncThunk<RequestUserData, RequestSignUp, { rejectValue: ErrorResponse }>('user/fetchUserRegistration',
  async (body: RequestSignUp, { rejectWithValue }) => {
    try {
      return await requestSignUp(body)
    } catch (error) {
      const err = error as AxiosError
      const errResponse = err.response?.data as ErrorResponse
      return rejectWithValue(errResponse)
    }
  })

export const fetchUserAuthorization = createAsyncThunk<RequestUserData, RequestSignIn, { rejectValue: ErrorResponse }>('user/fetchUserAuthorization',
  async (body: RequestSignIn, { rejectWithValue }) => {
    try {
      return await requestSignIn(body)
    } catch (error) {
      const err = error as AxiosError
      const errResponse = err.response?.data as ErrorResponse
      return rejectWithValue(errResponse)
    }
  })

export const fetchRefreshTokenJWT = createAsyncThunk<RequestUserData, { accessToken: string }, { rejectValue: ErrorResponse }>('user/fetchRefreshTokenJWT',
  async (body: { accessToken: string }, { rejectWithValue }) => {
    try {
      return await requestRefreshTokenJWT(body)
    } catch (error) {
      const err = error as AxiosError
      const errResponse = err.response?.data as ErrorResponse
      return rejectWithValue(errResponse)
    }
  })

export const fetchUserData = createAsyncThunk<RequestUserData, { accessToken: string }, { rejectValue: ErrorResponse }>('user/fetchUserData',
  async (body: { accessToken: string }, { rejectWithValue }) => {
    try {
      return await requestUserData(body)
    } catch (error) {
      const err = error as AxiosError
      const errResponse = err.response?.data as ErrorResponse
      return rejectWithValue(errResponse)
    }
  })

export const userSlice = createSlice({
  name: 'user',

  initialState: {
    accessToken: '',
    user: {} as UserData,
    status: 0,
    error: false,
    loading: false,
    errorMessage: '',
  } as Partial<UserState>,

  reducers: {
  },


  extraReducers: (builder) => {
    builder.addCase(fetchUserRegistration.pending, (state) => {
      state.loading = true
      state.error = false
    })

    builder.addCase(fetchUserRegistration.fulfilled, (state, action: PayloadAction<RequestUserData>) => {
      state.status = action.payload.status
      state.loading = false
      state.error = false
      state.errorMessage = ''
      console.log(action.payload)
    })

    builder.addCase(fetchUserRegistration.rejected, (state, action) => {
      state.status = action.payload?.status
      state.loading = false
      state.error = true
      state.errorMessage = action.payload?.message
    })

    builder.addCase(fetchUserAuthorization.pending, (state) => {
      state.loading = true
      state.error = false
    })

    builder.addCase(fetchUserAuthorization.fulfilled, (state, action: PayloadAction<RequestUserData>) => {
      state.status = 200
      state.loading = false
      state.error = false
      state.accessToken = action.payload.accessToken
      state.user = action.payload.user
      state.errorMessage = ''
      setDataLocalStorage('accessToken', action.payload.accessToken)
    })

    builder.addCase(fetchUserAuthorization.rejected, (state, action) => {
      state.status = action.payload?.status
      state.loading = false
      state.error = true
      state.errorMessage = action.payload?.message
    })

    builder.addCase(fetchRefreshTokenJWT.pending, (state) => {
      state.loading = true
      state.error = false
    })

    builder.addCase(fetchRefreshTokenJWT.fulfilled, (state, action: PayloadAction<RequestUserData>) => {
      state.status = action.payload.status
      state.loading = false
      state.error = false
      state.accessToken = action.payload.accessToken
      state.user = action.payload.user
      state.errorMessage = ''
      setDataLocalStorage('accessToken', action.payload.accessToken)
    })

    builder.addCase(fetchRefreshTokenJWT.rejected, (state, action) => {
      state.status = action.payload?.status
      state.loading = false
      state.error = true
      state.errorMessage = action.payload?.message
      state.accessToken = ''
      setDataLocalStorage('accessToken', '')
    })

    builder.addCase(fetchUserData.pending, (state) => {
      state.loading = true
      state.error = false
    })

    builder.addCase(fetchUserData.fulfilled, (state, action: PayloadAction<RequestUserData>) => {
      state.status = action.payload.status
      state.loading = false
      state.error = false
      state.user = action.payload.user
      state.errorMessage = ''
    })

    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.status = action.payload?.status
      state.loading = false
      state.error = true
      state.errorMessage = action.payload?.message
    })
  },

})

export const userReducer = userSlice.reducer
