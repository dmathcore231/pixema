import "./styles.scss"
import { GenresList } from "../GenresList"
import { truncateTitle } from "../../helpers"
import { CardProps } from "../../types/interfaces/CardProps"


export function Card({ img, title, genres, rating }: CardProps): JSX.Element {
  return (
    <div className="card">
      <a href="#" className="card__link">
        <div className="card__image">
          <img src={img} alt="movie poster" className="card__poster" />
          <div className="card__rating subtitle subtitle_size_xs">
            {rating}
          </div>
        </div>
        <div className="card__title subtitle subtitle_size_s">
          {truncateTitle(title, 30)}
        </div>
      </a>
      <GenresList itemList={genres} />
    </div>
  )
}
