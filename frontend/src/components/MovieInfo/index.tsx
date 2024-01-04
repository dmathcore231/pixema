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
        <ul className="movie-info-list">
          <li className="movie-info-list__item">
            <div className="movie-info-list__title
            subtitle subtitle_size_xs subtitle_color_secondary">Year</div>
            <div className="movie-info-list__value
            subtitle subtitle_size_xs subtitle_weight_500">{year}</div>
          </li>
          <li className="movie-info-list__item">
            <div className="movie-info-list__title
            subtitle subtitle_size_xs subtitle_color_secondary">Release date</div>
            <div className="movie-info-list__value
            subtitle subtitle_size_xs subtitle_weight_500">{releaseDate}</div>
          </li>
          <li className="movie-info-list__item">
            <div className="movie-info-list__title
            subtitle subtitle_size_xs subtitle_color_secondary">Box office</div>
            <div className="movie-info-list__value
            subtitle subtitle_size_xs subtitle_weight_500">{boxOffice}</div>
          </li>
          <li className="movie-info-list__item">
            <div className="movie-info-list__title
            subtitle subtitle_size_xs subtitle_color_secondary">Country</div>
            <div className="movie-info-list__value
            subtitle subtitle_size_xs subtitle_weight_500">{country}</div>
          </li>
          <li className="movie-info-list__item">
            <div className="movie-info-list__title
            subtitle subtitle_size_xs subtitle_color_secondary">Production</div>
            <div className="movie-info-list__value
            subtitle subtitle_size_xs subtitle_weight_500">{production}</div>
          </li>
          <li className="movie-info-list__item">
            <div className="movie-info-list__title
            subtitle subtitle_size_xs subtitle_color_secondary">Actors</div>
            <div className="movie-info-list__value
            subtitle subtitle_size_xs subtitle_weight_500">{actors}</div>
          </li>
          <li className="movie-info-list__item">
            <div className="movie-info-list__title
            subtitle subtitle_size_xs subtitle_color_secondary">Directors</div>
            <div className="movie-info-list__value
            subtitle subtitle_size_xs subtitle_weight_500">{directors}</div>
          </li>
          <li className="movie-info-list__item">
            <div className="movie-info-list__title
            subtitle subtitle_size_xs subtitle_color_secondary">Writers</div>
            <div className="movie-info-list__value
            subtitle subtitle_size_xs subtitle_weight_500">{writers}</div>
          </li>
        </ul>
      </div>
    </div>
  )
}
