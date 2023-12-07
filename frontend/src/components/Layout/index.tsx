import "./styles.scss"
import { Outlet } from "react-router-dom"
import { Header } from "../Header"
import { Main } from "../Main"
import { Footer } from "../Footer"
import { NavBar } from "../NavBar"
import { store } from "../../redux/store"
import { fetchRefreshTokenJWT } from "../../redux/userSlice"
import { getDataLocalStorage } from "../../helpers"

export function Layout() {
  const dataLocalStorage = getDataLocalStorage('accessToken')
  if (dataLocalStorage) {
    store.dispatch(fetchRefreshTokenJWT({ accessToken: dataLocalStorage }))
  }

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
