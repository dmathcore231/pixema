import "./styles.scss"
import { BtnProps } from "../../types/interfaces/BtnProps"

export function Btn({ type, className, children, form, onClick, disabled }: BtnProps): JSX.Element {
  return (
    <button
      type={type}
      className={"btn" + (className ? " " + className : "")}
      form={form}
      onClick={onClick}
      disabled={disabled ? true : false}
    >
      {children}
    </button>
  )
}
