export interface RequestDashboard {
  name: string
  password: string
}



export interface DashboardState {
  status: number
  loading: boolean
  error: boolean
  message: string
}
