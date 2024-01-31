import { UserData } from "./UserData"

export interface RequestDashboard {
  formLoginDashboard: {
    name: string
    password: string
  }

}

export interface DashboardState {
  status: number
  isAuth: boolean
  loading: boolean
  error: boolean
  message: string
  users: UserData[]
  userById: UserData
  totalUsers: number
}

export interface ResponseAllUsers {
  users: UserData[]
  status: number
  message: string
  totalUsers: number
}

export interface ResponseUserDataById {
  data: UserData
  status: number
  message: string
}

export interface RequestUpdateUserData {
  formUpdateUserDashboard: {
    userName: string
    email: string
    userRole: string
    userId: string
  }

}
