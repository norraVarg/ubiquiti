import React, { useState } from 'react'

interface Props {
  trigger: React.ReactNode
  message: React.ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
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

const getTooltipStyles = (position: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
) => {
  switch (position) {
    case 'top':
      return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2'
    case 'bottom':
      return 'top-full left-1/2 transform -translate-x-1/2 mt-2'
    case 'left':
      return 'top-1/2 right-full transform -translate-y-1/2 mr-2'
    case 'right':
      return 'top-1/2 left-full transform -translate-y-1/2 ml-2'
    case 'top-left':
      return 'bottom-full right-0 mb-2'
    case 'top-right':
      return 'bottom-full left-0 mb-2'
    case 'bottom-left':
      return 'top-full right-0 mt-2'
    case 'bottom-right':
      return 'top-full left-0 mt-2'
    default:
      return ''
  }
}