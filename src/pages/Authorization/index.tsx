import "./styles.scss"
import { Outlet } from "react-router-dom"

export function Authorization(): JSX.Element {
  return (
    <div className="authorization">
      <Outlet />
      <div className="authorization__footer subtitle subtitle_size_xs subtitle_weight_500">
        © All Rights Reserved
      </div>
    </div>
  )
}
