import "./styles.scss"
import { Card } from "../../components/Card"
import Poster from "../../images/poster.png"
import PosterTwo from "../../images/posterTwo.png"


export function Main(): JSX.Element {
  return (
    <div className="main-page">
      <div className="main-page__item">
        <Card img={Poster} />
      </div>
      <div className="main-page__item">
        <Card img={PosterTwo} />
      </div>
      <div className="main-page__item">
        <Card img={Poster} />
      </div>
      <div className="main-page__item">
        <Card img={PosterTwo} />
      </div>
      <div className="main-page__item">
        <Card img={Poster} />
      </div>
      <div className="main-page__item">
        <Card img={PosterTwo} />
      </div>
      <div className="main-page__item">
        <Card img={Poster} />
      </div>
      <div className="main-page__item">
        <Card img={PosterTwo} />
      </div>
      <div className="main-page__item">
        <Card img={PosterTwo} />
      </div>
      <div className="main-page__item">
        <Card img={Poster} />
      </div>
    </div>
  )
}
