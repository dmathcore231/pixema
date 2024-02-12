import './styles.scss'
import { useState } from 'react'
import { TooltipProps } from '../../types/interfaces/TooltipProps'

export function Tooltip({ text, children }: TooltipProps): JSX.Element {
  const [showTooltip, setShowTooltip] = useState(false)

  const handleMouseEnter = () => {
    setShowTooltip(true)
  }

  const handleMouseLeave = () => {
    setShowTooltip(false)
  }

  return (
    <div
      className="tooltip-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="tooltip-content">
        {children}
      </div>
      {showTooltip && (
        <div className="tooltip subtitle subtitle_size_xxs">
          {text}
        </div>
      )}
    </div>
  )
}
