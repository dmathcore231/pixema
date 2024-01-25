import { useEffect } from "react"
import { getDataLocalStorage } from "../helpers"
import { useAppDispatch } from "../hooks"
import { fetchRefreshTokenJWT } from "../redux/userSlice"
import { useLocation } from "react-router-dom"

export function RefreshTokenJwt(): JSX.Element | null {
  const dispatch = useAppDispatch()
  const location = useLocation()

  useEffect(() => {
    const token = getDataLocalStorage("accessToken")
    if (token) {
      dispatch(fetchRefreshTokenJWT({ accessToken: token }))
    }
  }, [dispatch, location])

  return null
}
