import { Tooltip } from "../Tooltip"

export function PixemaRecommended(): JSX.Element {
  return (
    <div className="pixema-recommended subtitle subtitle_size_xs">
      <Tooltip text="Pixema recommended">
        <span className="subtitle subtitle_size_xs subtitle_color_primary">P</span>
        R
      </Tooltip>
    </div>
  )
}
