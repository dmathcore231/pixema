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
        element: <PrivateRouter redirectPath="/sign-in" def={false}>
          <Settings />
        </PrivateRouter>
      },
      {
        path: "/user/favorites",
        element: <PrivateRouter redirectPath="/sign-in" def={false}>
          <Favorites />
        </PrivateRouter>
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
        element: <PrivateRouter redirectPath="/" def={true}>
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
