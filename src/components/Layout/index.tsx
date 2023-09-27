import "./styles.scss"
import { Outlet } from "react-router-dom"
import { Header } from "../Header"
import { Main } from "../Main"
import { Footer } from "../Footer"
import { SearchInput } from "../SearchInput"
import { UserProfiles } from "../UserProfiles"

export function Layout() {
  return (
    <div className="layout">
      <Header>
        <SearchInput />
        <UserProfiles />
      </Header>
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </div>
  )
}
