import "./styles.scss"
import Logo from "../../images/logo.png"
import { SearchInput } from "../SearchInput"
import { UserProfiles } from "../UserProfiles"

export function Header(): JSX.Element {

  return (
    <header className="container header">
      <div className="header__logo">
        <img className="header__logo-img" src={Logo} alt="logo" />
      </div>
      <SearchInput />
      <UserProfiles />
    </header>
  )
}
