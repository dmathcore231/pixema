import "./styles.scss"
import { SwitchProps } from "../../types/interfaces/SwitchProps"


export function Switch({ onChange, isChecked }: SwitchProps): JSX.Element {
  return (
    <label className="switch">
      <input type="checkbox" className="switch__input" onChange={onChange} checked={isChecked} />
      <div className="slider"></div>
    </label>
  )
}
