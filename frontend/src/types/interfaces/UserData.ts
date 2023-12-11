
export interface RequestSignIn {
  email: string
  password: string
}

export interface RequestSignUp {
  userName: string
  email: string
  password: string
}

export interface RequestUpdateUserData extends RequestSignUp {
  newPassword: string
}

export interface UserData {
  userName: string
  email: string
  password: string
  _role: string
  _id: string
  __v: number
}

export interface RequestUserData {
  accessToken: string
  user: UserData | null
  status: number
  message: string
}

export interface UserState extends RequestUserData {
  error: boolean
  loading: boolean
  errorMessage: string
}

export interface ErrorResponse {
  status: number
  message: string
}
