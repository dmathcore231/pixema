import "./styles.scss"
import imgPoster from "../../images/poster.png"

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
      <div className="genres">
        <ul className="genres__list">
          <li className="genres__item genres__item_list-style_none
          subtitle subtitle_size_xxs subtitle_color_secondary">
            Adventure
          </li>
          <li className="genres__item
          subtitle subtitle_size_xxs subtitle_color_secondary">
            Action
          </li>
          <li className="genres__item
          subtitle subtitle_size_xxs subtitle_color_secondary">
            Fantasy
          </li>
        </ul>
      </div>
    </div>
  )
}
