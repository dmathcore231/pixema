import "./styles.scss"
import { ArrowLeft } from "../../images/Icons/ArrowLeft"
import { ArrowRight } from "../../images/Icons/ArrowRight"

export interface RecommendationsProps {
  value: JSX.Element[]
}

export function Recommendations({ value }: RecommendationsProps): JSX.Element {

  return (
    <div className="recommendations">
      <div className="recommendations__header">
        <div className="recommendations__title">
          <h2>Recommendations</h2>
        </div>
        <div className="recommendations-toggle">
          <div className="recommendations-toggle__item">
            <ArrowLeft width="24" height="24" />
          </div>
          <div className="recommendations-toggle__item">
            <ArrowRight width="24" height="24" />
          </div>
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
