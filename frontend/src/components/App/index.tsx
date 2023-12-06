import "./styles.scss"
import { RouterProvider } from "react-router-dom"
import { router } from "../../router"
import { Provider } from "react-redux"
import { store } from "../../redux/store"
import { RefreshToken } from "../../utils/refreshToken"

export function App() {
  return (
    <Provider store={store}>
      <RefreshToken>
        <RouterProvider router={router} />
      </RefreshToken>
    </Provider>
  )
}
