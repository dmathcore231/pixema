import "./styles.scss"
import { PresentationProps } from "../../types/interfaces/PresentationProps"
import { PixemaRecommended } from "../pixemaRecommended"

export function Presentation({ itemList }: PresentationProps): JSX.Element {
  return (
    <ul className="presentation">
      <li className="presentation__item presentation__item_bg_success subtitle subtitle_size_xs">
        {itemList[0]}
      </li>
      <li className="presentation__item subtitle subtitle_size_xs">
        IMDb {itemList[1]}
      </li>
      <li className="presentation__item subtitle subtitle_size_xs">
        {itemList[2]} min
      </li>
      {itemList[3]
        ? (
          <li className="presentation__item subtitle subtitle_size_xs">
            <PixemaRecommended />
          </li>
        ) : null}
    </ul>
  )
}
