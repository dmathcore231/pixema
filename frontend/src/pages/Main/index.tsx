import "./styles.scss"
import { useEffect } from "react"
import { useAppDispatch } from "../../hooks"
import { Card } from "../../components/Card"
import { useAppSelector } from "../../hooks"
import { ShowMoreBox } from "../../components/ShowMoreBox"
import { Error } from "../../components/Error"
import { fetchMovies } from "../../redux/movieSlice"

export function Main(): JSX.Element {
  const dispatch = useAppDispatch()
  const { movies, loading, error } = useAppSelector(state => state.movies)

  useEffect(() => {
    dispatch(fetchMovies())
  }, [dispatch])

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
    if (movies) {
      return (
        <>
          {movies.map(movie => (
            <div key={movie._id}
              className="main-page__item"
            >
              <Card
                id={movie._id}
                poster={movie.poster}
                title={movie.title}
                genres={movie.genre}
                rating={movie.rating}
                isRecommended={movie.isRecommended}
              />
            </div>
          ))}
        </>
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
