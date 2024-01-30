import "./styles.scss"
import { Outlet } from "react-router-dom"
import { Header } from "../Header"
import { Main } from "../Main"
import { Footer } from "../Footer"
import { NavBar } from "../NavBar"
import { RefreshTokenJwt } from "../../utils/RefreshToken"

export function Layout(): JSX.Element {
  return (
    <div className="layout">
      <Header />
      <RefreshTokenJwt />
      <Main>
        <NavBar />
        <Outlet />
      </Main>
      <Footer />
    </div >
  )
}
