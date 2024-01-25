import "./styles.scss"
import { GenresList } from "../GenresList"
import { truncateTitle } from "../../helpers"
import { CardProps } from "../../types/interfaces/CardProps"
import noPoster from "../../images/no-poster.png"
import { Link } from "react-router-dom"
import { PixemaRecommended } from "../pixemaRecommended"
import { FavoritesIcon } from "../../images/Icons/FavoritesIcon"

export function Card({ poster, title, genres, rating, id, isRecommended, isFavorite }: CardProps): JSX.Element {
  return (
    <div className="card">
      <Link to={id ? `/movie/${id}` : "#"} className="card__link">
        <div className="card__image">
          <img src={poster ? poster : noPoster} alt="movie poster" className="card__poster" />
          <div className={`card__rating subtitle subtitle_size_xs`
            + (rating <= 7 && rating >= 5 ? ' card__rating_color_yellow' : rating < 5 ? ' card__rating_color_red' : '')}>
            {rating}
          </div>
          {isRecommended
            ? <div className="card__recommendation ">
              <PixemaRecommended />
            </div>
            : null}
          {isFavorite
            ? <div className="card__favorite">
              <FavoritesIcon width="24" height="24" />
            </div>
            : null}
        </div>
        <div className="card__title subtitle subtitle_size_s">
          {truncateTitle(title, 30)}
        </div>
      </Link>
      <GenresList itemList={genres} />
    </div>
  )
}
