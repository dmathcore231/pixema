import "./styles.scss"
import { SpinnerIcon } from "../../images/Icons/SpinnerIcon"

export interface SpinnerProps {
  width: string
  height: string
}

export function Spinner({ width, height }: SpinnerProps): JSX.Element {
  return (
    <SpinnerIcon className="spinner" width={width} height={height} />
  )
}
