import { IconProps } from "../../types/interfaces/IconProps"

export function SpinnerIcon({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 50 50" fill="inherit" className={className}
      xmlns="http://www.w3.org/2000/svg">
      <circle className="path" cx="25" cy="25" r="20" fill="inherit" strokeWidth="5"></circle>
    </svg>
  )
}


