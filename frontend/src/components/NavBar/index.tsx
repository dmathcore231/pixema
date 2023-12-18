import "./styles.scss"
import { HomeIcon } from "../../images/Icons/HomeIcon"
import { TrendsIcon } from "../../images/Icons/TrendsIcon"
import { FavoritesIcon } from "../../images/Icons/FavoritesIcon"
import { SettingsIcon } from "../../images/Icons/SettingsIcon"
import { NavLink } from "react-router-dom"
import { useAppSelector } from "../../hooks"

export function NavBar(): JSX.Element {
  const { user } = useAppSelector(state => state.user)

  function renderNavBar() {
    if (user) {
      if (user._role === 'admin') {
        return (
          <aside className="aside">
            <nav className="navbar">
              <ul className="navbar__nav">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    <HomeIcon className="nav-link__icon" width="24" height="24" />
                    <div className="subtitle subtitle_color_inherit">Home</div>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/trends">
                    <TrendsIcon className="nav-link__icon" width="24" height="24" />
                    <div className="subtitle subtitle_color_inherit">Trends</div>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/user/favorites">
                    <FavoritesIcon className="nav-link__icon" width="24" height="24" />
                    <div className="subtitle subtitle_color_inherit">Favorites</div>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/user/settings">
                    <SettingsIcon className="nav-link__icon" width="24" height="24" />
                    <div className="subtitle subtitle_color_inherit">Settings</div>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/dashboard/login">
                    <SettingsIcon className="nav-link__icon" width="24" height="24" />
                    <div className="subtitle subtitle_color_inherit">Dashboard</div>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </aside>
        )
      } else {
        return (
          <aside className="aside">
            <nav className="navbar">
              <ul className="navbar__nav">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    <HomeIcon className="nav-link__icon" width="24" height="24" />
                    <div className="subtitle subtitle_color_inherit">Home</div>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/trends">
                    <TrendsIcon className="nav-link__icon" width="24" height="24" />
                    <div className="subtitle subtitle_color_inherit">Trends</div>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/user/favorites">
                    <FavoritesIcon className="nav-link__icon" width="24" height="24" />
                    <div className="subtitle subtitle_color_inherit">Favorites</div>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/user/settings">
                    <SettingsIcon className="nav-link__icon" width="24" height="24" />
                    <div className="subtitle subtitle_color_inherit">Settings</div>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </aside>
        )
      }
    } else {
      return (
        <aside className="aside">
          <nav className="navbar">
            <ul className="navbar__nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  <HomeIcon className="nav-link__icon" width="24" height="24" />
                  <div className="subtitle subtitle_color_inherit">Home</div>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/trends">
                  <TrendsIcon className="nav-link__icon" width="24" height="24" />
                  <div className="subtitle subtitle_color_inherit">Trends</div>
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>
      )
    }
  }

  return (
    renderNavBar()
  )
}
