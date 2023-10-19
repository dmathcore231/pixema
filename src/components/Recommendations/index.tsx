import "./styles.scss"
import { ArrowLeft } from "../../images/Icons/ArrowLeft"
import { ArrowRight } from "../../images/Icons/ArrowRight"

export interface RecommendationsProps {
  value: JSX.Element[]
  clickRight: (e: React.MouseEvent) => void
  clickLeft: (e: React.MouseEvent) => void
}

export function Recommendations({ value, clickRight, clickLeft }: RecommendationsProps): JSX.Element {

  return (
    <div className="recommendations">
      <div className="recommendations__header">
        <div className="recommendations__title">
          <h2>Recommendations</h2>
        </div>
        <div className="recommendations-toggle">
          <button className="recommendations-toggle__item
          btn btn_padding_none"
            onClick={clickLeft}>
            <ArrowLeft width="24" height="24" />
          </button>
          <button className="recommendations-toggle__item
          btn btn_padding_none"
            onClick={clickRight}>
            <ArrowRight width="24" height="24" />
          </button>
        </div>
      </div>
      <ul className="recommendations__list">
        {value.map((item, index) => (
          <li key={index} className="recommendations__item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
