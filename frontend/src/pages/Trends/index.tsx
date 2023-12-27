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
        <MultiSelect
          placeholder="Select options"
          options={[{ value: "1", label: "Option 1" }, { value: "2", label: "Option 2" }, { value: "3", label: "Option 3" }, { value: "4", label: "Option 4" }]}
        />
      </div>
    </div>
  )
}
