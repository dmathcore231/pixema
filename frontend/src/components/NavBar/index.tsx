import "./styles.scss"
import { HomeIcon } from "../../images/Icons/HomeIcon"
import { TrendsIcon } from "../../images/Icons/TrendsIcon"
import { FavoritesIcon } from "../../images/Icons/FavoritesIcon"
import { SettingsIcon } from "../../images/Icons/SettingsIcon"
import { NavLink } from "react-router-dom"
import { NavBarProps } from "../../types/interfaces/NavBarProps"

export function NavBar({ isAuth, _r, _dash }: NavBarProps): JSX.Element {

  if (_r) {
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
            <div className="nav-item">
              <NavLink className="nav-link" to={_dash ? "/dashboard/main" : "/dashboard"}>
                <HomeIcon className="nav-link__icon" width="24" height="24" />
                <div className="subtitle subtitle_color_inherit">Dashboard</div>
              </NavLink>
            </div>
          </ul>
        </nav>
      </aside>
    )
  } else if (!_r && isAuth) {
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
