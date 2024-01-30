
export interface RequestSignIn {
  formSignIn: {
    email: string
    password: string
  }
}

export interface RequestSignUp {
  formSignUp: {
    userName: string
    email: string
    password: string
  }
}

export interface RequestUpdateUserData extends RequestSignUp {
  newPassword: string
}

export interface UserData {
  userName: string
  email: string
  password?: string
  _role: string
  _id: string
  __v: number
  moviesData: {
    favorites: string[]
    moviesRating: string[]
  }
}

export interface RequestUserData {
  isAuth: string | null
  data: UserData | null
  status: number
  message: string
}

export interface RequestUserDataAuthorization {
  accessToken: string | null
  refreshToken: string | null
  user: UserData | null
  status: number
  message: string
}

export interface UserState extends RequestUserDataAuthorization {
  error: boolean
  loading: boolean
  def: boolean
}

export interface ResponseNoData {
  status: number
  message: string
}


