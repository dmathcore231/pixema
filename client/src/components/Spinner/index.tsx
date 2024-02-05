import "./styles.scss"
import { SpinnerIcon } from "../../images/Icons/SpinnerIcon"
import { SpinnerProps } from "../../types/interfaces/SpinnerProps"
export function Spinner({ width, height }: SpinnerProps): JSX.Element {
  return (
    <SpinnerIcon className="spinner" width={width} height={height} />
  )
}
