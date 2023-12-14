import { createBrowserRouter } from "react-router-dom"
import { PrivateRouter } from "./PrivateRouter"
import { DefRouter } from "./DefRouter"
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
import { Dashboard } from "./dashboard"
import { DashboardLogin } from "./dashboard/DashboardLogin"
import { DashboardMain } from "./dashboard/Main"
import { DashboardMovies } from "./dashboard/DashboardMovies"
import { DashboardUsers } from "./dashboard/DashboardUsers"
import { DashboardStatistics } from "./dashboard/DashboardStatistics"

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
        path: "/dashboard/login",
        element: <PrivateRouter redirectPath="/sign-in" def={true}>
          <DashboardLogin />
        </PrivateRouter>
      },
      {
        element: <Dashboard />,
        children: [
          {
            path: "/dashboard/main",
            element: <DefRouter redirectPath="/sign-in" >
              <DashboardMain />
            </DefRouter>
          },
          {
            path: "/dashboard/movies",
            element: <DefRouter redirectPath="/sign-in" >
              <DashboardMovies />
            </DefRouter>
          },
          {
            path: "/dashboard/users",
            element: <DefRouter redirectPath="/sign-in" >
              <DashboardUsers />
            </DefRouter>
          },
          {
            path: "/dashboard/statistics",
            element: <DefRouter redirectPath="/sign-in" >
              <DashboardStatistics />
            </DefRouter>
          }
        ]
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
