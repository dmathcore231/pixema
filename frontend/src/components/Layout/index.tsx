import "./styles.scss"
import { Outlet } from "react-router-dom"
import { useAppSelector } from "../../hooks"
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
  const { accessToken } = useAppSelector(state => state.user)

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

  function isAuth() {
    if (accessToken) {
      return true
    } else {
      return false
    }
  }

  function checkRole() {
    if (getDataLocalStorage('_r') === 'true') {
      return true
    } else {
      return false
    }
  }

  function checkDashLogin() {
    if (getDataLocalStorage('isAuth') === 'true') {
      return true
    } else {
      return false
    }
  }

  return (
    <div className="layout">
      <Header />
      <Main>
        <NavBar isAuth={isAuth()} _r={checkRole()} _dash={checkDashLogin()} />
        <Outlet />
      </Main>
      <Footer />
    </div >
  )
}
