import { useEffect } from "react"
import { useAppDispatch } from "../hooks"
import { fetchRefreshTokenJWT } from "../redux/userSlice"
import { getDataLocalStorage } from "../helpers"

export function RefreshToken({ children }: { children: JSX.Element }): JSX.Element {
  const token = getDataLocalStorage('accessToken')
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (token) {
      dispatch(fetchRefreshTokenJWT({ accessToken: token }))

    }
  }, [dispatch, token])

  return (
    <>{children}</>
  )
}
