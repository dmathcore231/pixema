import { createBrowserRouter } from "react-router-dom"
import { Layout } from "./components/Layout"
import { Main } from "./pages/Main"
import { Movie } from "./pages/Movie"
import { Settings } from "./pages/Settings"
import { Authorization } from "./pages/Authorization"
import { SignIn } from "./components/SignIn"
import { SignUp } from "./components/SignUp"
import { Favorites } from "./pages/Favorites"
import { Trends } from "./pages/Trends"
import { ResetPassword } from "./components/ResetPassword"
import { Dashboard } from "./pages/Dashboard"
import { PrivateRouter } from "./PrivateRouter"

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
        path: "/user/settings",
        element: <Settings />
      },
      {
        path: "/user/favorites",
        element: <Favorites />
      },
      {
        path: "/trends",
        element: <Trends />
      },
      {
        path: "/movies",
        element: <Main />
      },
      {
        path: "/dashboard",
        element: <PrivateRouter redirectPath="/sign-in">
          <Dashboard />
        </PrivateRouter>


      }
    ]
  },
  {
    element: <Authorization />,
    children: [
      {
        path: "/sign-in",
        element: <SignIn />
      },
      {
        path: "/sign-up",
        element: <SignUp />
      },
      {
        path: "/reset-password",
        element: <ResetPassword />
      }
    ]
  }
])
