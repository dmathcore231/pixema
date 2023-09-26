import { HeaderProps } from "../../types/interfaces/HeaderProps"
import "./styles.scss"
import Logo from "../../images/logo.png"

export function Header(props: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="container header__content">
        <div className="header__logo">
          <img className="header__logo-img" src={Logo} alt="logo" />
        </div>
        {props.children}
      </div>
    </header>
  )
}
