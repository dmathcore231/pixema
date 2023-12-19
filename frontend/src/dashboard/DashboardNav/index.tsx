import './styles.scss'
import { NavLink } from "react-router-dom"

export function DashboardNav(): JSX.Element {
  return (
    <div className='dashboard-panel-nav'>
      <ul className='dashboard-panel-nav__list'>
        <li className='dashboard-panel-nav__item'>
          <NavLink className="dashboard-panel-nav__link" to="/dashboard/main">
            Main
          </NavLink>
        </li>
        <li className='dashboard-panel-nav__item'>
          <NavLink className="dashboard-panel-nav__link" to="/dashboard/users">
            Users
          </NavLink>
        </li>
        <li className='dashboard-panel-nav__item'>
          <NavLink className="dashboard-panel-nav__link" to="/dashboard/movies">
            Movies
          </NavLink>
        </li>
        <li className='dashboard-panel-nav__item'>
          <NavLink className="dashboard-panel-nav__link" to="/dashboard/statistics">
            Statistics
          </NavLink>
        </li>
      </ul>
    </div>
  )
}
