import { IconProps } from "../../types/interfaces/IconProps"

export function ArrowRightSelect({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <path fill="#fff" fillRule="evenodd" d="M9.235 6.36a1 1 0 0 1 1.406.156l4.5 5.624-4.5 5.625a1 1 0 1 1-1.562-1.25l3.5-4.375-3.5-4.375a1 1 0 0 1 .156-1.406Z" clipRule="evenodd" />
    </svg>
  )
}
