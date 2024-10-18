import { useState, useCallback, ReactNode } from 'react'
import { getTooltipStyles, TooltipPosition } from '../../utils/utils'

interface Props {
  message: ReactNode
  children: ReactNode
  duration?: number
  position?: TooltipPosition
}

export const TimeoutTooltip = (props: Props) => {
  const { message, children, duration = 2000, position = 'top' } = props

  const [isTooltipVisible, setIsTooltipVisible] = useState(false)

  const showTooltip = useCallback(() => {
    setIsTooltipVisible(true)

    setTimeout(() => {
      setIsTooltipVisible(false)
    }, duration)
  }, [duration])

  return (
    <div className="relative">
      <div onClick={showTooltip}>
        {children}
      </div>
      {isTooltipVisible && (
        <div className={`${getTooltipStyles(position)} text-web-unifi-color-ublue-06 absolute z-40 text-nowrap text-sm`}>
          {message}
        </div>
      )}
    </div>
  )
}
