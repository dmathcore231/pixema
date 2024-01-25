import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks"
import { fetchUserData } from "../redux/userSlice"

export function UserData(): JSX.Element | null {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const { accessToken } = useAppSelector((state) => state.user)
  console.log(accessToken)

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchUserData({ accessToken: accessToken }))
    }
  }, [dispatch, accessToken, location])
  return null
}
