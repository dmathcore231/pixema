import "./styles.scss"
import Poster from "../../images/poster.png"
import PosterTwo from "../../images/posterTwo.png"
import { GenresList } from "../../components/GenresList"
import { Presentation } from "../../components/Presentation"
import { BtnGroup } from "../../components/BtnGroup"
import { ShareIcon } from "../../images/Icons/ShareIcon"
import { FavoritesIcon } from "../../images/Icons/FavoritesIcon"
import { MovieInfo } from "../../components/MovieInfo"
import { Card } from "../../components/Card"
import { Carousel } from "../../components/Carousel"

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
        <MovieInfo
          description="In 1984, after saving the world in Wonder Woman (2017), the immortal Amazon warrior, Princess Diana of Themyscira, finds herself trying to stay under the radar, working as an archaeologist at the Smithsonian Museum. With the memory of the brave U.S. pilot, Captain Steve Trevor, etched on her mind, Diana Prince becomes embroiled in a sinister conspiracy of global proportions when a transparent, golden-yellow citrine gemstone catches the eye of the power-hungry entrepreneur, Maxwell Lord. "
          year={2020}
          releaseDate="15 Jul 2020"
          boxOffice="$381,409,310"
          country="United Kingdom, United States"
          production={["DC", "Warner Bros"]}
          actors={["Gal Gadot, Chris Pine, Kristen Wiig, Pedro Pascal"]}
          directors="Patty Jenkins"
          writers="Patty Jenkins, Geoff Johns"
        />
      </div>
      <div className="movie__carousel">
        <Carousel
          data={[<Card img={PosterTwo} />, <Card img={PosterTwo} />, <Card img={PosterTwo} />, <Card img={Poster} />, <Card img={Poster} />, <Card img={PosterTwo} />, <Card img={Poster} />, <Card img={Poster} />]} title="Recommended" />
      </div>
    </div>
  )
}
