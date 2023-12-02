import { clientRest } from "./client"
import { getDataLocalStorage } from "../helpers/index"

export async function tokenJWT() {
  if (getDataLocalStorage("accessToken")) {
    clientRest.defaults.headers.common['Authorization'] = `Bearer ${getDataLocalStorage("accessToken")}`
  }
}
