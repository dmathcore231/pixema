import "./styles.scss"
import { MainProps } from "../../types/interfaces/MainProps"
import { NavBar } from "../NavBar"

export function Main(props: MainProps): JSX.Element {
  return (
    <main className="container main">
      <NavBar />
      {props.children}
    </main>
  )
}
