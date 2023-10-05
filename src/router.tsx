import { createBrowserRouter } from "react-router-dom"
import { Layout } from "./components/Layout"
import { Main } from "./pages/Main"
import { Movie } from "./pages/Movie"
import { Settings } from "./pages/Settings"

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Main />
      },
      {
        path: "/movie/:id",
        element: <Movie />
      },
      {
        path: "/settings",
        element: <Settings />
      }

    ]
  }
])
