import { Navigate } from "react-router-dom"
import { DefRouterProps } from "./types/interfaces/DefRouterProps"
import { getDataLocalStorage } from "./helpers"

export function DefRouter({ children, redirectPath }: DefRouterProps): JSX.Element {

  if (getDataLocalStorage('accessToken') && getDataLocalStorage('_r') === 'true' && getDataLocalStorage('isAuth') === 'true') {
    return (
      children
    )
  }

  return (
    <Navigate to={redirectPath} />
  )
}
