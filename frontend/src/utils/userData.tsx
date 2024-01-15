import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"
import { fetchUserData } from "../redux/userSlice"

export function UserData(): JSX.Element | null {
  const dispatch = useAppDispatch()
  const { accessToken } = useAppSelector((state) => state.user)

  useEffect(() => {
    if (accessToken) {
      console.log(accessToken + ' userData')
      dispatch(fetchUserData({ accessToken: accessToken }))
    }
  }, [dispatch, accessToken])
  return null
}
