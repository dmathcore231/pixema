import "./styles.scss"
import { Outlet } from "react-router-dom"
import Logo from "../../images/logo.png"

export function Authorization(): JSX.Element {
  return (
    <div className="container container_bg_image">
      <div className="authorization">
        <div className="authorization-header">
          <a href="/" className="authorization-header__logo">
            <img src={Logo} alt="logo" />
          </a>
        </div>
        <div className="authorization-body">
          <Outlet />
        </div>
        <div className="authorization__footer subtitle subtitle_size_xs subtitle_weight_500">
          © All Rights Reserved
        </div>
      </div>
    </div>
  )
}
