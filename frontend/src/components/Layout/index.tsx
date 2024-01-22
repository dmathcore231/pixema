import "./styles.scss"
import { Outlet } from "react-router-dom"
import { Header } from "../Header"
import { Main } from "../Main"
import { Footer } from "../Footer"
import { NavBar } from "../NavBar"

export function Layout(): JSX.Element {
  return (
    <div className="layout">
      <Header />
      <Main>
        <NavBar />
        <Outlet />
      </Main>
      <Footer />
    </div >
  )
}
