import "./styles.scss"
import homeIcon from "../../images/interface/home-icon.png"
import trendsIcon from "../../images/interface/trends-icon.png"
import favoritesIcon from "../../images/interface/favorites-icon.png"
import settingsIcon from "../../images/interface/settings-icon.png"

export function NavBar(): JSX.Element {
  return (
    <aside className="aside">
      <nav className="navbar">
        <ul className="navbar__nav">
          <a className="navbar__nav-item" href="#">
            <img src={homeIcon} alt="home" />
            <div className="subtitle">Home</div>
          </a>
          <a className="navbar__nav-item subtitle" href="#">
            <img src={trendsIcon} alt="trends" />
            <div className="subtitle">Trends</div>
          </a>
          <a className="navbar__nav-item subtitle" href="#">
            <img src={favoritesIcon} alt="favorites" />
            <div className="subtitle">Favorites</div>
          </a>
          <a className="navbar__nav-item subtitle" href="#">
            <img src={settingsIcon} alt="settings" />
            <div className="subtitle">Settings</div>
          </a>
        </ul>
      </nav>
    </aside>

  )
}
