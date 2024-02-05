import { IconProps } from "../../types/interfaces/IconProps"

export function ArrowDownSelect({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <path fill="#fff" fillRule="evenodd" d="M17.78 9.375a1 1 0 0 1-.155 1.406L12 15.28l-5.625-4.5a1 1 0 1 1 1.25-1.562L12 12.72l4.375-3.5a1 1 0 0 1 1.406.156Z" clipRule="evenodd" />
    </svg>
  )
}
