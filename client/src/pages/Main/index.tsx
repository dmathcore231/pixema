import "./styles.scss"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { Card } from "../../components/Card"
import { ShowMoreBox } from "../../components/ShowMoreBox"
import { Error } from "../../components/Error"
import { fetchMovies } from "../../redux/movieSlice"
import { ActiveFilters } from "../../components/ActiveFilters"

export function Main(): JSX.Element {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.user)
  const { movies, loading, error, moviesByFilters, activeFilters } = useAppSelector(state => state.movies)
  const userFavoriteMovies = user?.moviesData.favorites

  useEffect(() => {
    if (!activeFilters) {
      dispatch(fetchMovies())
    }
  }, [dispatch, activeFilters])


  function renderCardsMovies(): JSX.Element {
    if (loading) {
      return (
        <ShowMoreBox />
      )
    }
    if (error) {
      return (
        <Error />
      )
    }

    if (moviesByFilters && activeFilters) {
      return (
        <>
          <div className="main-page__filters">
            <ActiveFilters />
          </div>
          <div className="main-page__list">
            {moviesByFilters.map(movie => (
              <div key={movie._id}
                className="main-page__item"
              >
                <Card
                  id={movie._id}
                  poster={movie.poster}
                  title={movie.title}
                  genres={movie.genre}
                  rating={movie.rating.ratingMovie}
                  isRecommended={movie.isRecommended}
                  isFavorite={userFavoriteMovies?.includes(movie._id)}
                />
              </div>
            ))}
          </div>
        </>
      )
    }
    if (movies && !activeFilters) {
      return (
        <div className="main-page__list">
          {movies.map(movie => (
            <div key={movie._id}
              className="main-page__item"
            >
              <Card
                id={movie._id}
                poster={movie.poster}
                title={movie.title}
                genres={movie.genre}
                rating={movie.rating.ratingMovie}
                isRecommended={movie.isRecommended}
                isFavorite={userFavoriteMovies?.includes(movie._id)}
              />
            </div>
          ))}
        </div>
      )
    } else {
      return (
        <Error />
      )
    }
  }

  return (
    <div className="main-page">
      {renderCardsMovies()}
    </div>
  )
}
