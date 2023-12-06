import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { RequestSignUp, RequestSignIn, UserData, UserState, RequestUserData, ErrorResponse } from "../types/interfaces/UserData"
import { requestSignUp, requestSignIn } from "../services/auth"
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

export const userSlice = createSlice({
  name: 'user',

  initialState: {
    accessToken: '',
    refreshToken: '',
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
      state.refreshToken = action.payload.refreshToken
      state.user = action.payload.user
      state.errorMessage = ''
      setDataLocalStorage('accessToken', action.payload.accessToken)
      setDataLocalStorage('refreshToken', action.payload.refreshToken)
    })

    builder.addCase(fetchUserAuthorization.rejected, (state, action) => {
      state.status = action.payload?.status
      state.loading = false
      state.error = true
      state.errorMessage = action.payload?.message
    })
  },

})

export const userReducer = userSlice.reducer
