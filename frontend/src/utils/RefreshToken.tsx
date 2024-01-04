import { useEffect } from "react"
import { getDataLocalStorage } from "../helpers"
import { useAppDispatch } from "../hooks"
import { fetchRefreshTokenJWT } from "../redux/userSlice"

export function RefreshTokenJwt(): JSX.Element | null {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = getDataLocalStorage("accessToken")
    if (token) {
      dispatch(fetchRefreshTokenJWT({ accessToken: token }))
    }
  }, [dispatch])

  return null
}
