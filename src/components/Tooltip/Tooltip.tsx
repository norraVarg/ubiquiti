import React, { useState } from 'react'
import { getTooltipStyles, TooltipPosition } from '../../utils/utils'

interface Props {
  trigger: React.ReactNode
  message: React.ReactNode
  position?: TooltipPosition
  disabled?: boolean
}

export const Tooltip = (props: Props) => {
  const { trigger, message, position = 'top', disabled = false } = props

  const [isVisible, setIsVisible] = useState(false)

  const showTooltip = () => {
    if (!disabled) {
      setIsVisible(true)
    }
  }

  const hideTooltip = () => {
    setIsVisible(false)
  }

  return (
    <div className='relative'>
      <div
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        className='cursor-pointer'
      >
        {trigger}
      </div>
      {isVisible && (
        <div className={`${getTooltipStyles(position)} absolute bg-web-unifi-color-neutral-0 border border-web-unifi-color-neutral-3 z-40 rounded-lg shadow text-nowrap`}>
          {message}
        </div>
      )}
    </div>
  )
}

