import "./styles.scss"
import { HomeIcon } from "../../images/Icons/HomeIcon"
import { TrendsIcon } from "../../images/Icons/TrendsIcon"
import { FavoritesIcon } from "../../images/Icons/FavoritesIcon"
import { SettingsIcon } from "../../images/Icons/SettingsIcon"

export function NavBar(): JSX.Element {
  return (
    <aside className="aside">
      <nav className="navbar">
        <ul className="navbar__nav">
          <div className="nav-item">
            <a className="nav-link" href="#">
              <HomeIcon className="nav-link__icon" width="24" height="24" />
              <div className="subtitle subtitle_color_inherit">Home</div>
            </a>
          </div>
          <div className="nav-item">
            <a className="nav-link" href="#">
              <TrendsIcon className="nav-link__icon" width="24" height="24" />
              <div className="subtitle subtitle_color_inherit">Trends</div>
            </a>
          </div>
          <div className="nav-item">
            <a className="nav-link" href="#">
              <FavoritesIcon className="nav-link__icon" width="24" height="24" />
              <div className="subtitle subtitle_color_inherit">Favorites</div>
            </a>
          </div>
          <div className="nav-item">
            <a className="nav-link" href="#">
              <SettingsIcon className="nav-link__icon" width="24" height="24" />
              <div className="subtitle subtitle_color_inherit">Settings</div>
            </a>
          </div>
        </ul>
      </nav>
    </aside>
  )
}
