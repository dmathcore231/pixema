import "./styles.scss"
import { Card } from "../../components/Card"
import { useAppSelector } from "../../hooks"
import { ShowMoreBox } from "../../components/ShowMoreBox"
import { Error } from "../../components/Error"

export function Main(): JSX.Element {
  const { movies, loading, error } = useAppSelector(state => state.movies)

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
    return (
      <>
        {movies.map(movie => (
          <div key={movie._id} className="main-page__item">
            <Card
              img={movie.poster}
              title={movie.title}
              genres={movie.genre}
              rating={movie.rating}
            />
          </div>
        ))}
      </>
    )
  }

  return (
    <div className="main-page">
      {renderCardsMovies()}
    </div>
  )
}
