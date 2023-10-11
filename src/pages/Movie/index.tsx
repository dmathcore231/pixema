import "./styles.scss"
import Poster from "../../images/poster.png"
import { GenresList } from "../../components/GenresList"
import { Presentation } from "../../components/Presentation"
import { BtnGroup } from "../../components/BtnGroup"
import { ShareIcon } from "../../images/Icons/ShareIcon"
import { FavoritesIcon } from "../../images/Icons/FavoritesIcon"

export function Movie(): JSX.Element {
  return (
    <div className="movie">
      <div className="movie__poster">
        <img src={Poster} alt="Movie poster" />
        <BtnGroup
          itemsName={["favorites", "share"]}
          itemsValue={[<FavoritesIcon width="24" height="24" />, <ShareIcon width="24" height="24" />]}
          onClick={(e) => console.log(e)}
        />
      </div>
      <div className="movie__content">
        <div className="movie__genres">
          <GenresList itemList={["Adventure", "Action", "Fantasy"]} />
        </div>
        <div className="movie__title">
          <h1>Wonder Woman 1984</h1>
        </div>
        <Presentation itemList={[7.6, 7.6, 130]} />
      </div>
    </div>
  )
}
