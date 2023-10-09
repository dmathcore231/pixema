import "./styles.scss"
import { FormInputProps } from "../../types/interfaces/FormInputProps"

export function FormInput({ label, htmlFor, children, type, id, placeholder, value, required, className, disabled, min, max, onChange }: FormInputProps): JSX.Element {
  function RenderInput(): JSX.Element {
    if (label) {
      return (
        <div className="form-input">
          <label htmlFor={htmlFor} className="subtitle subtitle_size_xxs label-input">
            {children}
          </label>
          <input
            type={type}
            className={"primary-input" + (className ? " " + className : "")}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            min={min}
            max={max}
          />
        </div>
      )
    } else {
      return (
        <>
          <input
            type={type}
            className={"primary-input" + (className ? " " + className : "")}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
          />
        </>
      )
    }
  }
  return (
    RenderInput()
  )
}