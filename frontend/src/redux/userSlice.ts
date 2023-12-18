import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { RequestSignUp, RequestSignIn, UserState, RequestUserData, ResponseNoData, RequestUpdateUserData } from "../types/interfaces/UserData"
import { requestSignUp, requestSignIn, requestRefreshTokenJWT, requestUserData, requestUpdateUserData } from "../services/auth"
import { getDataLocalStorage, setDataLocalStorage } from "../helpers"

export const fetchUserRegistration = createAsyncThunk<RequestUserData, RequestSignUp, { rejectValue: ResponseNoData }>('user/fetchUserRegistration',
  async (body: RequestSignUp, { rejectWithValue }) => {
    try {
      return await requestSignUp(body)
    } catch (error) {
      const err = error as AxiosError
      const errResponse = err.response?.data as ResponseNoData
      return rejectWithValue(errResponse)
    }
  })

export const fetchUserAuthorization = createAsyncThunk<RequestUserData, RequestSignIn, { rejectValue: ResponseNoData }>('user/fetchUserAuthorization',
  async (body: RequestSignIn, { rejectWithValue }) => {
    try {
      return await requestSignIn(body)
    } catch (error) {
      const err = error as AxiosError
      const errResponse = err.response?.data as ResponseNoData
      return rejectWithValue(errResponse)
    }
  })

export const fetchRefreshTokenJWT = createAsyncThunk<RequestUserData, { accessToken: string }, { rejectValue: ResponseNoData }>('user/fetchRefreshTokenJWT',
  async (body: { accessToken: string }, { rejectWithValue }) => {
    try {
      return await requestRefreshTokenJWT(body)
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

export const userSlice = createSlice({
  name: 'user',

  initialState: {
    accessToken: '',
    user: null,
    status: 0,
    error: false,
    loading: false,
    errorMessage: '',
    def: false,
  } as Partial<UserState>,

  reducers: {
    logout: (state) => {
      state.accessToken = ''
      state.user = null
      state.status = 0
      state.error = false
      state.loading = false
      state.errorMessage = ''
      setDataLocalStorage('accessToken', '')
      if (getDataLocalStorage('_r')) {
        setDataLocalStorage('_r', '')
        setDataLocalStorage('isAuth', '')
      }
    },
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
      if (action.payload.user?._role === 'admin') {
        state.def = true
      } else {
        state.def = false
      }
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
      if (action.payload.user?._role === 'admin') {
        state.def = true
      } else {
        state.def = false
      }
    })

    builder.addCase(fetchRefreshTokenJWT.rejected, (state, action) => {
      state.status = action.payload?.status
      state.loading = false
      state.error = true
      state.errorMessage = action.payload?.message
      state.accessToken = ''
      setDataLocalStorage('accessToken', '')
      if (getDataLocalStorage('_r')) {
        setDataLocalStorage('_r', '')
        setDataLocalStorage('isAuth', '')
      }
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

    builder.addCase(fetchUpdateUserData.pending, (state) => {
      state.loading = true
      state.error = false
    })

    builder.addCase(fetchUpdateUserData.fulfilled, (state, action: PayloadAction<RequestUserData>) => {
      state.status = action.payload.status
      state.loading = false
      state.error = false
      state.user = action.payload.user
      state.errorMessage = ''
    })

    builder.addCase(fetchUpdateUserData.rejected, (state, action) => {
      state.status = action.payload?.status
      state.loading = false
      state.error = true
      state.errorMessage = action.payload?.message
    })
  },

})

export const userReducer = userSlice.reducer
export const { logout } = userSlice.actions
