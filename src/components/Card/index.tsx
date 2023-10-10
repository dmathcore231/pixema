import "./styles.scss"
import imgPoster from "../../images/poster.png"
import { GenresList } from "../GenresList"

export function Card(): JSX.Element {
  return (
    <div className="card">
      <a href="#" className="card__link">
        <div className="card__image">
          <img src={imgPoster} alt="movie poster" className="card__poster" />
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
