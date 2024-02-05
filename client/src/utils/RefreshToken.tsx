import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { getDataLocalStorage } from "../helpers"
import { useAppDispatch } from "../hooks"
import { setAccessToken } from "../redux/userSlice"

export function RefreshTokenJwt(): JSX.Element | null {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const token = getDataLocalStorage("accessToken")

  useEffect(() => {
    if (token) {
      dispatch(setAccessToken(token))
    }
  }, [dispatch, location, token])

  return null
}
