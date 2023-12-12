import { Navigate } from "react-router-dom"
import { useAppSelector } from "./hooks"
import { PrivateRouterProps } from "./types/interfaces/PrivateRouterProps"

export function PrivateRouter({ children, redirectPath }: PrivateRouterProps): JSX.Element {
  const { user } = useAppSelector(state => state.user)

  if (user && user._role === "admin") {
    return (
      children
    )
  }

  return (
    <Navigate to={redirectPath} />
  )
}
