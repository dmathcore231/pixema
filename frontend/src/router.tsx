import { createBrowserRouter } from "react-router-dom"
import { PrivateRouter } from "./PrivateRouter"
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
import { DashboardUser } from "./dashboard/DashboardUser"

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
        element: <PrivateRouter redirectPath="/sign-in">
          <Settings />
        </PrivateRouter>
      },
      {
        path: "/user/favorites",
        element: <PrivateRouter redirectPath="/sign-in">
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
            element: <PrivateRouter redirectPath="/sign-in" def={true}>
              <DashboardMain />
            </PrivateRouter>
          },
          {
            path: "/dashboard/movies",
            element: <PrivateRouter redirectPath="/sign-in" def={true} >
              <DashboardMovies />
            </PrivateRouter>
          },
          {
            path: "/dashboard/users",
            element: <PrivateRouter redirectPath="/sign-in" def={true} >
              <DashboardUsers />
            </PrivateRouter>
          },
          {
            path: "/dashboard/statistics",
            element: <PrivateRouter redirectPath="/sign-in" def={true} >
              <DashboardStatistics />
            </PrivateRouter>
          },
          {
            path: "/dashboard/users/:userId",
            element: <PrivateRouter redirectPath="/sign-in" def={true} >
              <DashboardUser />
            </PrivateRouter>
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
