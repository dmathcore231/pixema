import "./styles.scss"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { fetchGetMovieById, fetchGetRecommendedMovies } from "../../redux/movieSlice"
import { fetchUpdateFavoriteMovie } from "../../redux/userSlice"
import { Spinner } from "../../components/Spinner"
import { Error } from "../../components/Error"
import { GenresList } from "../../components/GenresList"
import { Presentation } from "../../components/Presentation"
import { BtnGroup } from "../../components/BtnGroup"
import { ShareIcon } from "../../images/Icons/ShareIcon"
import { FavoritesIcon } from "../../images/Icons/FavoritesIcon"
import { MovieInfo } from "../../components/MovieInfo"
import { Carousel } from "../../components/Carousel"
import { LinkBack } from "../../components/LinkBack"
import { Rating } from "../../components/Rating"

export function Movie(): JSX.Element {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { movie, loading, error, recommendedMovies } = useAppSelector(state => state.movies)
  const { user } = useAppSelector(state => state.user)
  const { id } = useParams()

  const [isFavorite, setIsFavorite] = useState(false)
  const [defaultCheck, setDefaultCheck] = useState(String)

  useEffect(() => {
    dispatch(fetchGetMovieById(id as string))
  }, [dispatch, id])

  useEffect(() => {
    if (id && isFavorite) {
      dispatch(fetchUpdateFavoriteMovie({ movieId: id }))
      setIsFavorite(false)
    }
  }, [dispatch, id, isFavorite])

  useEffect(() => {
    if (user && user.moviesData.favorites.includes(id as string)) {
      setDefaultCheck("favorites")
    } else {
      setDefaultCheck('')
    }
  }, [user, id])

  useEffect(() => {
    if (id) {
      dispatch(fetchGetRecommendedMovies(id))
    }
  }, [dispatch, id])

  if (loading) {
    return (
      <div className="movie-loader">
        <div className="movie-loader__content">
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

  function handleClickBtnFavorites() {
    if (user) {
      setIsFavorite(true)
    } else {
      navigate('/sign-in')
    }
  }

  return (
    <>
      {(movie && Object.keys(movie).length > 0) && (
        <div className="movie">
          <div className="movie__link-back">
            <LinkBack />
          </div>
          <div className="movie__poster">
            <img src={movie.poster} alt="Movie poster" className="movie__poster-img" />
            <BtnGroup
              itemsName={["favorites", "share"]}
              itemsValue={[<FavoritesIcon width="24" height="24" />, <ShareIcon width="24" height="24" />]}
              onChange={handleClickBtnFavorites}
              defaultCheck={defaultCheck}
            />
            {user ? <Rating /> : null}
          </div>
          <div className="movie__content">
            <div className="movie__genres">
              <GenresList itemList={movie!.genre} />
            </div>
            <div className="movie__title">
              <h1>{movie.title}</h1>
            </div>
            <Presentation itemList={[movie.rating.ratingMovie, movie.imdbRating, movie.duration, movie.isRecommended]} />
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
          <div className="movie__carousel">
            <Carousel
              data={recommendedMovies ? recommendedMovies : null} title="Recommended" />
          </div>
        </div>
      )}
    </>
  )
}

