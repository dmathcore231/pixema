import "./styles.scss"
import { Outlet } from "react-router-dom"
import { Header } from "../Header"
import { Main } from "../Main"
import { Footer } from "../Footer"
import { NavBar } from "../NavBar"
import { RefreshTokenJwt } from "../../utils/RefreshToken"
import { UserData } from "../../utils/userData"

export function Layout(): JSX.Element {
  return (
    <div className="layout">
      <Header />
      <RefreshTokenJwt />
      <UserData />
      <Main>
        <NavBar />
        <Outlet />
      </Main>
      <Footer />
    </div >
  )
}
