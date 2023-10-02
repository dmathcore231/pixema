import { IconProps } from "../../types/interfaces/IconProps"

export function CloseIcon({ className, width, height }: IconProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="inherit" className={className} xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M17.6569 16.2426L13.4142 12L17.6569 7.75735C18.0472 7.36702 18.0472 6.73346 17.6569 6.34313C17.2665 5.95281 16.633 5.95281 16.2426 6.34313L12 10.5858L7.75736 6.34313C7.36704 5.95281 6.73347 5.95281 6.34315 6.34313C5.95282 6.73346 5.95282 7.36702 6.34315 7.75735L10.5858 12L6.34315 16.2426C5.95212 16.6337 5.95282 17.2665 6.34315 17.6568C6.73347 18.0472 7.36633 18.0479 7.75736 17.6568L12 13.4142L16.2426 17.6568C16.6337 18.0479 17.2665 18.0472 17.6569 17.6568C18.0472 17.2665 18.0479 16.6337 17.6569 16.2426Z" fill="inherit" />
    </svg>
  )
}
