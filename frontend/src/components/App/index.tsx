import "./styles.scss"
import { RouterProvider } from "react-router-dom"
import { router } from "../../router"
import { Provider } from "react-redux"
import { store } from "../../redux/store"
import { RefreshTokenJwt } from "../../utils/RefreshToken"
import { UserData } from "../../utils/userData"

export function App() {
  return (
    <Provider store={store}>
      <RefreshTokenJwt />
      <UserData />
      <RouterProvider router={router} />
    </Provider>
  )
}
