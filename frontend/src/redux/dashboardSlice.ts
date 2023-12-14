import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { requestDashboard } from "../services/dashboard"
import { AxiosError } from "axios"
import { ResponseNoData } from "../types/interfaces/UserData"
import { RequestDashboard, DashboardState } from "../types/interfaces/Dashboard"

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

export const dashboardSlice = createSlice({
  name: 'dashboard',

  initialState: {
    status: 0,
    loading: false,
    error: false,
    message: '',
  } as Partial<DashboardState>,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchDashboard.pending, (state) => {
      state.loading = true
      state.error = false
    })

    builder.addCase(fetchDashboard.fulfilled, (state, action: PayloadAction<ResponseNoData>) => {
      state.loading = false
      state.error = false
      state.status = action.payload.status
      state.message = action.payload.message
    })

    builder.addCase(fetchDashboard.rejected, (state, action) => {
      state.status = action.payload?.status
      state.message = action.payload?.message
      state.loading = false
      state.error = true
    })
  }
})

export const dashboardReducer = dashboardSlice.reducer
