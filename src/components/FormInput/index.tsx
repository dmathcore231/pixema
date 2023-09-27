import "./styles.scss"
import { FormInputProps } from "../../types/interfaces/FormInputProps"

export function FormInput({ label, htmlFor, children, type, id, placeholder, value, required, className, disabled, onChange }: FormInputProps): JSX.Element {
  function RenderInput(): JSX.Element {
    if (label) {
      return (
        <>
          <label htmlFor={htmlFor}><h5>{children}</h5></label>
          <input
            type={type}
            className={`primary-input ${className}`}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
          />
        </>
      )
    } else {
      return (
        <>
          <input
            type={type}
            className={`primary-input ${className}`}
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
