import "./styles.scss"
import { GenresList } from "../GenresList"

export interface CardProps {
  img: string
}

export function Card({ img }: CardProps): JSX.Element {
  return (
    <div className="card">
      <a href="#" className="card__link">
        <div className="card__image">
          <img src={img} alt="movie poster" className="card__poster" />
          <div className="card__rating subtitle subtitle_size_xs">
            7.6
          </div>
        </div>
        <div className="card__title subtitle subtitle_size_s">
          Wonder Woman 1984
        </div>
      </a>
      <GenresList itemList={["Adventure", "Action", "Fantasy"]} />
    </div>
  )
}
