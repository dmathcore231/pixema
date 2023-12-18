import { Navigate } from "react-router-dom"
import { PrivateRouterProps } from "./types/interfaces/PrivateRouterProps"
import { useAppSelector } from "./hooks"
import { useEffect, useState } from "react"

export function PrivateRouter({ children, redirectPath, def }: PrivateRouterProps): JSX.Element {
  const { user, loading } = useAppSelector(state => state.user)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    if (def) {
      if (!user && !loading) {
        setRedirect(true)
      } else if (user && !loading && user._role !== 'admin') {
        setRedirect(true)
      } else {
        setRedirect(false)
      }
    } else {
      if (!user && !loading) {
        setRedirect(true)
      } else {
        setRedirect(false)
      }
    }
  }, [user, loading, def])

  if (redirect) {
    return <Navigate to={redirectPath} />
  } else {
    return children
  }
}
