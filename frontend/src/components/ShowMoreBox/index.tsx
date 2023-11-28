import "./styles.scss"
import { Spinner } from "../Spinner"

export function ShowMoreBox(): JSX.Element {
  return (
    <div className="show-more">
      <div className="show-more__text">Show more</div>
      <Spinner width="20" height="20" />
    </div>
  )
}
