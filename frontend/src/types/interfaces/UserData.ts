
export interface ResponseDataUser {
  userName?: string
  email: string
  password: string
}

export interface UserData extends ResponseDataUser {
  _role: string
  _id: string
  __v: number
}

export interface RequestUsersData {
  accessToken: string
  refreshToken: string
  users: UserData
  status: number
}
