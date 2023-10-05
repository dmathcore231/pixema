import "./styles.scss"

export function Switch(): JSX.Element {
  return (
    <label className="switch">
      <input type="checkbox" className="switch__input" />
      <div className="slider"></div>
    </label>
  )
}
