import "./styles.scss"
import { HomeIcon } from "../../images/Icons/HomeIcon"
import { TrendsIcon } from "../../images/Icons/TrendsIcon"
import { FavoritesIcon } from "../../images/Icons/FavoritesIcon"
import { SettingsIcon } from "../../images/Icons/SettingsIcon"
import { NavLink } from "react-router-dom"
import { useAppSelector } from "../../hooks"

export function NavBar(): JSX.Element {
  const { user } = useAppSelector((state) => state.user)

  if (user) {
    return (
      <aside className="aside">
        <nav className="navbar">
          <ul className="navbar__nav">
            <div className="nav-item">
              <NavLink className="nav-link" to="/">
                <HomeIcon className="nav-link__icon" width="24" height="24" />
                <div className="subtitle subtitle_color_inherit">Home</div>
              </NavLink>
            </div>
            <div className="nav-item">
              <NavLink className="nav-link" to="/trends">
                <TrendsIcon className="nav-link__icon" width="24" height="24" />
                <div className="subtitle subtitle_color_inherit">Trends</div>
              </NavLink>
            </div>
            <div className="nav-item">
              <NavLink className="nav-link" to="/user/favorites">
                <FavoritesIcon className="nav-link__icon" width="24" height="24" />
                <div className="subtitle subtitle_color_inherit">Favorites</div>
              </NavLink>
            </div>
            <div className="nav-item">
              <NavLink className="nav-link" to="/user/settings">
                <SettingsIcon className="nav-link__icon" width="24" height="24" />
                <div className="subtitle subtitle_color_inherit">Settings</div>
              </NavLink>
            </div>
          </ul>
        </nav>
      </aside>
    )
  } else {
    return (
      <aside className="aside">
        <nav className="navbar">
          <ul className="navbar__nav">
            <div className="nav-item">
              <NavLink className="nav-link" to="/">
                <HomeIcon className="nav-link__icon" width="24" height="24" />
                <div className="subtitle subtitle_color_inherit">Home</div>
              </NavLink>
            </div>
            <div className="nav-item">
              <NavLink className="nav-link" to="/trends">
                <TrendsIcon className="nav-link__icon" width="24" height="24" />
                <div className="subtitle subtitle_color_inherit">Trends</div>
              </NavLink>
            </div>
          </ul>
        </nav>
      </aside>
    )
  }
}
