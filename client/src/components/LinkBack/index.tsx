import './styles.scss'
import { NavLink } from 'react-router-dom'
import { ArrowLeft } from '../../images/Icons/ArrowLeft'

export function LinkBack(): JSX.Element {
  return (
    <div className="link-back">
      <NavLink
        className='link-back__item'
        to='#'
        onClick={() => window.history.back()}
      >
        <ArrowLeft width="35" height="35" />
      </NavLink>
    </div>
  )
}
