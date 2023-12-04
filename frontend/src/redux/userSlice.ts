import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { RequestSignUp, UserData, UserState, RequestUserData } from "../types/interfaces/UserData"
import { requestSignUp } from "../services/auth"

export const fetchUserRegistration = createAsyncThunk<RequestUserData, RequestSignUp, { rejectValue: { status: number, message: string } }>('user/fetchUserRegistration',
  async (body: RequestSignUp, { rejectWithValue }) => {
    try {
      return await requestSignUp(body)
    } catch (error) {
      const err = error as AxiosError
      const errResponse = err.response?.data as { status: number, message: string }
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
      state.status = 201
      state.loading = false
      state.error = false
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.user = action.payload.user
    })

    builder.addCase(fetchUserRegistration.rejected, (state, action) => {
      state.status = action.payload?.status
      state.loading = false
      state.error = true
      state.errorMessage = action.payload?.message
    })
  },

})

export const userReducer = userSlice.reducer
