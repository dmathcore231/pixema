import "./styles.scss"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { fetchUserData } from "../../redux/userSlice"
import userIcon from "../../images/interface/user-icon.png"
import arrowRightIcon from "../../images/interface/arrow-right.png"
import { Spinner } from "../Spinner"
import { truncateTitle } from "../../helpers"

export function UserProfiles(): JSX.Element {
  const dispatch = useAppDispatch()
  const { user, accessToken, loading } = useAppSelector(state => state.user)
  console.log(user)
  useEffect(() => {
    if (accessToken) {
      dispatch(fetchUserData({ accessToken }))
    }
  }, [accessToken])

  if (loading) {
    return (
      <a href="/sign-in" className="user-profiles">
        <div className="user-profiles__wrapper">
          <div className="user-profiles__avatar">
            <img src={userIcon} alt="User Avatar" />
          </div>
          <div className="user-profiles__name main-text">
            <Spinner width="20" height="20" />
          </div>
        </div>
        <div className="arrow-icon arrow-icon_right">
          <img src={arrowRightIcon} alt="Arrow Right Icon" />
        </div>
      </a>
    )
  }

  return (
    <a href={user ? `/user/settings` : "/sign-in"} className="user-profiles">
      <div className="user-profiles__wrapper">
        <div className="user-profiles__avatar">
          <img src={userIcon} alt="User Avatar" />
        </div>
        <div className="user-profiles__name main-text">
          {user ? truncateTitle(user.userName, 13) : "Sign In"}
        </div>
      </div>
      <div className="arrow-icon arrow-icon_right">
        <img src={arrowRightIcon} alt="Arrow Right Icon" />
      </div>
    </a>
  )
}
