import './styles.scss'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { Btn } from '../../components/Btn'
import { useNavigate } from 'react-router-dom'
import { fetchMovies } from '../../redux/movieSlice'
import { truncateTitle } from '../../helpers'
import { Spinner } from '../../components/Spinner'
import { Error } from '../../components/Error'

export function DashboardMovies(): JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { movies, loading, error } = useAppSelector(state => state.movies)

  useEffect(() => {
    dispatch(fetchMovies())
  }, [dispatch])

  if (loading) {
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
        <div className='dashboard-movies__content'>
          <div className='dashboard-movies__spinner'>
            <Spinner width='40' height='40' />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='dashboard-movies'>
        <div className='dashboard-movies__header'>
          <div className='dashboard-movies__title'>
            <h2>Movies</h2>
          </div>
        </div>
        <div className='dashboard-movies__error'>
          <Error />
        </div>
      </div>
    )
  }

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
      <div className='dashboard-movies__content'>
        <table className="table-movies">
          <thead className="table-movies__head">
            <tr className="total-user">
              <th className="total-user__item">
                Total movies: {movies?.length}
              </th>
            </tr>
          </thead>
          <tbody className="table-movies__body">
            <tr className="table-movies-col">
              <th className="table-movies-col__item">Number</th>
              <th className="table-movies-col__item">Title</th>
              <th className="table-movies-col__item">Rating</th>
              <th className="table-movies-col__item">Year</th>
              <th className="table-movies-col__item">Edit</th>
            </tr>
            {movies?.map((movie, index) => (
              <tr key={movie._id} className="table-movies-row">
                <td className="table-movies-row__item">{index + 1}</td>
                <td className="table-movies-row__item">{truncateTitle(movie.title, 25)}</td>
                <td className="table-movies-row__item">{movie.rating}</td>
                <td className="table-movies-row__item">{movie.year}</td>
                <td className="table-movies-row__item">
                  <Btn
                    type="button"
                    className="btn_primary"
                    onClick={() => console.log('edit')}
                  >
                    Edit
                  </Btn>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
