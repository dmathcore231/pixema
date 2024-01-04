import "./styles.scss"
import { GenresList } from "../GenresList"
import { truncateTitle } from "../../helpers"
import { CardProps } from "../../types/interfaces/CardProps"
import noPoster from "../../images/no-poster.png"
import { Link } from "react-router-dom"

export function Card({ img, title, genres, rating, id }: CardProps): JSX.Element {
  return (
    <div className="card">
      <Link to={id ? `/movie/${id}` : "#"} className="card__link">
        <div className="card__image">
          <img src={img ? img : noPoster} alt="movie poster" className="card__poster" />
          <div className="card__rating subtitle subtitle_size_xs">
            {rating}
          </div>
        </div>
        <div className="card__title subtitle subtitle_size_s">
          {truncateTitle(title, 30)}
        </div>
      </Link>
      <GenresList itemList={genres} />
    </div>
  )
}
