import './styles.scss'
import { Btn } from '../../components/Btn'
import { useNavigate } from 'react-router-dom'

export function DashboardMovies(): JSX.Element {
  const navigate = useNavigate()
  return (
    <div className='dashboard-movies'>
      <div className='dashboard-movies__header'>
        <div className='dashboard-movies__title'>
          <h2>Movies</h2>
        </div>
        <div className='dashboard-movies__btn'>
          <Btn
            type='button'
            className='btn_primary'
            onClick={() => {
              navigate('/dashboard/movies/add')
            }}
          >
            Add movie
          </Btn>
        </div>
      </div>
    </div>
  )
}
