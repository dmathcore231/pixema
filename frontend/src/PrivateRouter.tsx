import { Navigate } from "react-router-dom"
import { PrivateRouterProps } from "./types/interfaces/PrivateRouterProps"
import { getDataLocalStorage } from "./helpers"

export function PrivateRouter({ children, redirectPath, def }: PrivateRouterProps): JSX.Element {

  if (def) {
    if (getDataLocalStorage('_r') === 'true' && getDataLocalStorage('accessToken')) {
      return (
        children
      )
    }
  } else {
    if (getDataLocalStorage('accessToken')) {
      return (
        children
      )
    }
  }

  return (
    <Navigate to={redirectPath} />
  )
}
