import "./styles.scss"
import Poster from "../../images/poster.png"
import { GenresList } from "../../components/GenresList"

export function Movie(): JSX.Element {
  return (
    <div className="movie">
      <div className="movie__poster">
        <img src={Poster} alt="Movie poster" />
        <div className="btn-group">
          <button className="btn btn_primary">Btn group</button>
        </div>
      </div>
      <div className="movie__content">
        <div className="movie__genres">
          <GenresList itemList={["Adventure", "Action", "Fantasy"]} />
        </div>
        <div className="movie__title">
          <h1>Wonder Woman 1984</h1>
        </div>
        <ul className="presentation">
          <li className="presentation__item">
            7.6
          </li>
          <li className="presentation__item">
            imdb 7.6
          </li>
          <li className="presentation__item">
            130 min
          </li>
        </ul>
      </div>
    </div>
  )
}
