import { clientRest } from "./client"
import { getDataLocalStorage, setDataLocalStorage } from "../helpers/index"
import { requestRefreshTokenJWT } from "../services/auth"

export async function refreshToken(): Promise<void> {
  const refreshToken = getDataLocalStorage("refreshToken")
  if (refreshToken) {
    try {
      const { data } = await requestRefreshTokenJWT({ refreshToken })
      if (data.status === 200) {
        setDataLocalStorage("accessToken", data.accessToken)
        clientRest.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`
      }
    } catch (error) {
      setDataLocalStorage("accessToken", "")
      setDataLocalStorage("refreshToken", "")
    }
  }
}
