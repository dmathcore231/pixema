import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { requestDashboard, requestGetAllUsers } from "../services/dashboard"
import { AxiosError } from "axios"
import { ResponseNoData, UserData } from "../types/interfaces/UserData"
import { RequestDashboard, DashboardState, ResponseAllUsers } from "../types/interfaces/Dashboard"

export const fetchDashboard = createAsyncThunk<ResponseNoData, RequestDashboard, { rejectValue: ResponseNoData }>('dashboard/fetchDashboard',
  async (body: RequestDashboard, { rejectWithValue }) => {
    try {
      return await requestDashboard(body)
    } catch (error) {
      const err = error as AxiosError
      const errResponse = err.response?.data as ResponseNoData
      return rejectWithValue(errResponse)
    }
  })

export const fetchAllUsers = createAsyncThunk<ResponseAllUsers, void, { rejectValue: ResponseNoData }>('dashboard/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      return await requestGetAllUsers()
    } catch (error) {
      const err = error as AxiosError
      const errResponse = err.response?.data as ResponseNoData
      return rejectWithValue(errResponse)
    }
  })


export const dashboardSlice = createSlice({
  name: 'dashboard',

  initialState: {
    status: 0,
    isAuth: false,
    loading: false,
    error: false,
    message: '',
    users: [] as UserData[],
    totalUsers: 0
  } as Partial<DashboardState>,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchDashboard.pending, (state) => {
      state.loading = true
      state.error = false
    })

    builder.addCase(fetchDashboard.fulfilled, (state, action: PayloadAction<ResponseNoData>) => {
      state.isAuth = true
      state.loading = false
      state.error = false
      state.status = action.payload.status
      state.message = action.payload.message
    })

    builder.addCase(fetchDashboard.rejected, (state, action) => {
      state.isAuth = false
      state.status = action.payload?.status
      state.message = action.payload?.message
      state.loading = false
      state.error = true
    })

    builder.addCase(fetchAllUsers.pending, (state) => {
      state.loading = true
      state.error = false
    })

    builder.addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<ResponseAllUsers>) => {
      state.loading = false
      state.error = false
      state.status = action.payload.status
      state.users = action.payload.users
      state.totalUsers = action.payload.totalUsers
      state.message = action.payload.message
    })

    builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.loading = false
      state.error = true
      state.status = action.payload?.status
      state.message = action.payload?.message
    })
  }
})

export const dashboardReducer = dashboardSlice.reducer
