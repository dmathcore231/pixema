import "./styles.scss"

export interface SwitchProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function Switch({ onChange }: SwitchProps): JSX.Element {
  return (
    <label className="switch">
      <input type="checkbox" className="switch__input" onChange={onChange} />
      <div className="slider"></div>
    </label>
  )
}
