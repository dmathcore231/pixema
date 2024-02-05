import './styles.scss'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { Card } from '../../components/Card'
import { fetchGetMoviesBySearch } from '../../redux/movieSlice'
import { Spinner } from '../../components/Spinner'
import { Error } from '../../components/Error'
import { NoContent } from '../../components/NoContent'
import { LinkBack } from '../../components/LinkBack'

export function Search(): JSX.Element {
  const dispatch = useAppDispatch()
  const { query } = useParams()

  const { moviesBySearch, loading, error } = useAppSelector(state => state.movies)

  useEffect(() => {
    if (query) {
      dispatch(fetchGetMoviesBySearch(query))
    }
  }, [dispatch, query])

  if (loading) {
    return (
      <div className="search-page">
        <div className="search-page__loader">
          <Spinner width="40" height="40" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="search-page">
        <div className='search-page__error'>
          <Error />
        </div>
      </div>
    )
  }

  return (
    <div className="search-page">
      <div className='search-page-title'>
        <div className='search-page-title__link'>
          <LinkBack />
        </div>
        <div className='search-page-title__text subtitle subtitle_size_xs'>
          Search results for "{query}"
        </div>
      </div>
      <div className='search-page__list'>
        {moviesBySearch && moviesBySearch.length > 0
          ? moviesBySearch.map(movie => (
            <div className='search-page__item' key={movie._id}>
              <Card
                id={movie._id}
                poster={movie.poster}
                title={movie.title}
                genres={movie.genre}
                rating={movie.rating}
                isRecommended={movie.isRecommended}
              />
            </div>
          ))
          : <NoContent text="No results found" />}
      </div>
    </div>
  )
}
