import "./styles.scss"
import { MainProps } from "../../types/interfaces/MainProps"


export function Main(props: MainProps): JSX.Element {
  return (
    <main className="container main">
      {props.children}
    </main>
  )
}
