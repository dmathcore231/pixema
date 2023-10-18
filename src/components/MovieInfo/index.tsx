import "./styles.scss"
import { MovieInfoProps } from "../../types/interfaces/MovieInfoProps"

export function MovieInfo({ description, year, releaseDate, boxOffice, country, production, actors, directors, writers }: MovieInfoProps): JSX.Element {
  return (
    <div className="movie-info">
      <div className="movie-info__description
      subtitle subtitle_size_xs subtitle_align_left">
        {description}
      </div>
      <div className="movie-info__details">
        <ul className="movie-info__list">
          <li className="title-list__item subtitle subtitle_size_xs subtitle_color_light">
            Year
          </li>
          <li className="title-list__item subtitle subtitle_size_xs subtitle_color_light">
            Released
          </li>
          <li className="title-list__item subtitle subtitle_size_xs subtitle_color_light">
            BoxOffice
          </li>
          <li className="title-list__item subtitle subtitle_size_xs subtitle_color_light">
            Country
          </li>
          <li className="title-list__item subtitle subtitle_size_xs subtitle_color_light">
            Production
          </li>
          <li className="title-list__item subtitle subtitle_size_xs subtitle_color_light">
            Actors
          </li>
          <li className="title-list__item subtitle subtitle_size_xs subtitle_color_light">
            Directors
          </li>
          <li className="title-list__item subtitle subtitle_size_xs subtitle_color_light">
            Writers
          </li>
        </ul>
        <ul className="movie-info__list">
          <li className="value-list__item subtitle subtitle_size_xs subtitle_weight_500">
            {year}
          </li>
          <li className="value-list__item subtitle subtitle_size_xs subtitle_weight_500">
            {releaseDate}
          </li>
          <li className="value-list__item subtitle subtitle_size_xs subtitle_weight_500">
            {boxOffice}
          </li>
          <li className="value-list__item subtitle subtitle_size_xs subtitle_weight_500">
            {country}
          </li>
          <li className="value-list__item subtitle subtitle_size_xs subtitle_weight_500">
            {production}
          </li>
          <li className="value-list__item subtitle subtitle_size_xs subtitle_weight_500">
            {actors}
          </li>
          <li className="value-list__item subtitle subtitle_size_xs subtitle_weight_500">
            {directors}
          </li>
          <li className="value-list__item subtitle subtitle_size_xs subtitle_weight_500">
            {writers}
          </li>
        </ul>
      </div>
    </div>
  )
}
