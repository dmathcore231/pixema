import "./styles.scss"
import { Outlet } from "react-router-dom"
import { Header } from "../Header"
import { Main } from "../Main"
import { Footer } from "../Footer"
import { SearchInput } from "../SearchInput"

export function Layout() {
  return (
    <div className="layout">
      <Header>
        <SearchInput />
        <div>account</div>
      </Header>
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </div>
  )
}
