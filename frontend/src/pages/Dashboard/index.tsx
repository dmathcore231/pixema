import "./styles.scss"
import { Outlet } from "react-router-dom"

export function Dashboard(): JSX.Element {

  return (
    <div className="dashboard">
      <Outlet />
    </div>
  )
}
