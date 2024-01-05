import './styles.scss'
import { LinkBack } from '../../components/LinkBack'

export function DashboardMovie(): JSX.Element {
  return (
    <div className="dashboard-movie">
      <div className='dashboard-movie__title'>
        <h2>Movie</h2>
      </div>
      <LinkBack />
      <div className='dashboard-movie__content'>
      </div>
    </div>
  )
}
