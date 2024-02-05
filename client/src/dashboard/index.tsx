import "./styles.scss"
import { Outlet } from "react-router-dom"
import { DashboardNav } from "./DashboardNav"

export function Dashboard(): JSX.Element {

  return (
    <div className="dashboard">
      <DashboardNav />
      <Outlet />
    </div>
  )
}
