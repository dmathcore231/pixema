import "./styles.scss"
import { useAppSelector, useAppDispatch } from "../../hooks"
import { useEffect } from "react"
import { fetchGetFavoritesMovies } from "../../redux/movieSlice"
import { Card } from "../../components/Card"
import { NoContent } from "../../components/NoContent"

export function Favorites(): JSX.Element {
  const dispatch = useAppDispatch()

  const { user } = useAppSelector(state => state.user)
  const { favoritesMovies } = useAppSelector(state => state.movies)

  useEffect(() => {
    if (user) {
      dispatch(fetchGetFavoritesMovies())
    }
  }, [dispatch, user])

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
                rating={movie.rating}
                isRecommended={movie.isRecommended}
              />
            </div>
          ))
          : <NoContent text="No favorites" />}
      </div>
    </div>
  )
}
