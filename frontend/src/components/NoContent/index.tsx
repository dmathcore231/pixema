import "./styles.scss"
import image from "../../images/interface/noMovies.png"
import { NoContentProps } from "../../types/interfaces/NoContentProps"

export function NoContent({ text }: NoContentProps): JSX.Element {
  return (
    <div className="no-content">
      <img src={image} alt="no data" />
      <div
        className="no-content__text">
        <h3 className="no-content__title">{text}</h3>
      </div>
    </div>
  )
}
