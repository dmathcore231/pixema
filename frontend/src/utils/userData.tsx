import { useEffect } from "react"
import { getDataLocalStorage } from "../helpers"
import { useAppDispatch } from "../hooks"
import { fetchUserData } from "../redux/userSlice"

export function UserData(): JSX.Element | null {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = getDataLocalStorage("accessToken")
    if (token) {
      dispatch(fetchUserData({ accessToken: token }))
    }
  }, [dispatch])

  return null
}
