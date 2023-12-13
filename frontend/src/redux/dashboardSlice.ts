import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { requestDashboard } from "../services/dashboard"
import { AxiosError } from "axios"
import { ResponseNoData } from "../types/interfaces/UserData"
import { RequestDashboard } from "../types/interfaces/Dashboard"

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
  },

  reducers: {},
})

