import './styles.scss'
import { NavLink } from "react-router-dom"

export function DashboardMain(): JSX.Element {

  return (
    <div className="dashboard-panel">
      <div className='dashboard-panel-nav'>
        <ul className='dashboard-panel-nav__list'>
          <li className='dashboard-panel-nav__item'>
            <NavLink className="dashboard-panel-nav__link" to="#">
              <h3>Users</h3>
            </NavLink>
          </li>
          <li className='dashboard-panel-nav__item'>
            <NavLink className="dashboard-panel-nav__link" to="#">
              <h3>Movies</h3>
            </NavLink>
          </li>
          <li className='dashboard-panel-nav__item'>
            <NavLink className="dashboard-panel-nav__link" to="#">
              <h3>Statistics</h3>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}
