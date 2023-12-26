import "./styles.scss"
import { MultiSelect } from "../../components/MultiSelect"

export function Trends(): JSX.Element {
  return (
    <div className="trends">
      <div className="trends__title">
        <h2>Trends</h2>
      </div>
      <div className="trends__content">
        content
        <MultiSelect />
      </div>
    </div>
  )
}
