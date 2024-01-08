import "./styles.scss"
import { useParams } from "react-router-dom"
import { fetchGetMovieById } from "../../redux/movieSlice"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { Spinner } from "../../components/Spinner"
import { Error } from "../../components/Error"
import { GenresList } from "../../components/GenresList"
import { Presentation } from "../../components/Presentation"
import { BtnGroup } from "../../components/BtnGroup"
import { ShareIcon } from "../../images/Icons/ShareIcon"
import { FavoritesIcon } from "../../images/Icons/FavoritesIcon"
import { MovieInfo } from "../../components/MovieInfo"
import { Card } from "../../components/Card"
import { Carousel } from "../../components/Carousel"
import { LinkBack } from "../../components/LinkBack"

export function Movie(): JSX.Element {
  const dispatch = useAppDispatch()
  const { movie, loading, error } = useAppSelector(state => state.movies)
  const { id } = useParams()

  useEffect(() => {
    dispatch(fetchGetMovieById(id as string))
  }, [dispatch, id])

  if (loading) {
    return (
      <div className="movie">
        <div className="movie__loader">
          <Spinner width="40" height="40" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="movie-error">
        <Error />
      </div>
    )
  }

  if (movie && Object.keys(movie).length > 0) {
    return (
      <>
        <div className="movie">
          <div className="movie__poster">
            <img src={movie.poster} alt="Movie poster" className="movie__poster-img" />
            <BtnGroup
              itemsName={["favorites", "share"]}
              itemsValue={[<FavoritesIcon width="24" height="24" />, <ShareIcon width="24" height="24" />]}
              onClick={(e) => console.log(e)}
            />
          </div>
          <div className="movie__content">
            <div className="movie__genres">
              <GenresList itemList={movie!.genre} />
            </div>
            <div className="movie__title">
              <h1>{movie.title}</h1>
            </div>
            <Presentation itemList={[movie.rating, movie.imdbRating, movie.duration, movie.isRecommended]} />
            <MovieInfo
              description={movie.description}
              year={movie.year}
              releaseDate={movie.releaseDate}
              boxOffice={`$${Number(movie.boxOffice).toLocaleString("en-US")}`}
              country={movie.country}
              production={movie.production}
              actors={movie.actors}
              directors={movie.directors}
              writers={movie.writers}
            />
          </div>
          {/* <div className="movie__carousel">
          <Carousel
            data={ } title="Recommended" />
        </div> */}
        </div>
      </>
    )
  } else {
    return (
      <div className="movie">
        <Error />
      </div>
    )
  }
}
