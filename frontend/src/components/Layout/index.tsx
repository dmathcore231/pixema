import "./styles.scss"
import { Outlet } from "react-router-dom"
import { Header } from "../Header"
import { Main } from "../Main"
import { Footer } from "../Footer"
import { NavBar } from "../NavBar"
import { fetchRefreshTokenJWT, fetchUserData } from "../../redux/userSlice"
import { useAppDispatch } from "../../hooks"
import { useEffect } from "react"
import { getDataLocalStorage } from "../../helpers"
import { fetchMovies } from "../../redux/movieSlice"

export function Layout() {
  const dispatch = useAppDispatch()
  console.log('Layout render')
  useEffect(() => {
    const fetchData = async () => {
      const token = getDataLocalStorage('accessToken')
      if (token) {
        await dispatch(fetchRefreshTokenJWT({ accessToken: token }))
        await dispatch(fetchUserData({ accessToken: token }))
      }
      await dispatch(fetchMovies())
    }
    fetchData()
  }, [dispatch])

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
