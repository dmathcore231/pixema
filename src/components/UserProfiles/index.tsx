import "./styles.scss"
import userIcon from "../../images/interface/user-icon.png"
import arrowRightIcon from "../../images/interface/arrow-right.png"

export function UserProfiles(): JSX.Element {
  return (
    <a href="#" className="user-profiles">
      <div className="user-profiles__wrapper">
        <div className="user-profiles__avatar">
          <img src={userIcon} alt="User Avatar" />
        </div>
        <div className="user-profiles__name main-text">
          Sign In
        </div>
      </div>
      <div className="arrow-icon arrow-icon_right">
        <img src={arrowRightIcon} alt="Arrow Right Icon" />
      </div>
    </a>
  )
}
