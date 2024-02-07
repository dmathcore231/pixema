import "./styles.scss"
import { useAppSelector, useAppDispatch } from "../../hooks"
import { useEffect } from "react"
import { fetchGetFavoritesMovies } from "../../redux/movieSlice"
import { Card } from "../../components/Card"
import { NoContent } from "../../components/NoContent"
import { Spinner } from "../../components/Spinner"
import { Error } from "../../components/Error"

export function Favorites(): JSX.Element {
  const dispatch = useAppDispatch()

  const { user } = useAppSelector(state => state.user)
  const { favoritesMovies, loading, error } = useAppSelector(state => state.movies)

  useEffect(() => {
    if (user) {
      dispatch(fetchGetFavoritesMovies())
    }
  }, [dispatch])

  if (loading) {
    return (
      <div className="favorites-page">
        <div className="favorites-page__loader">
          <Spinner width="40" height="40" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="favorites-page">
        <div className="favorites-page__error">
          <Error />
        </div>
      </div>
    )
  }

  return (
    <div className="favorites-page">
      <div className="favorites-page__list">
        {favoritesMovies && favoritesMovies.length > 0
          ? favoritesMovies.map(movie => (
            <div className="favorites-page__item" key={movie._id}>
              <Card
                id={movie._id}
                poster={movie.poster}
                title={movie.title}
                genres={movie.genre}
                rating={movie.rating.ratingMovie}
                isRecommended={movie.isRecommended}
                isFavorite={true}
              />
            </div>
          ))
          : <NoContent text="No favorites" />}
      </div>
    </div>
  )
}
