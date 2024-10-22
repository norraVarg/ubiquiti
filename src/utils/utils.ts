import { ZodIssue } from 'zod'
import { SearchMatch } from '../components/Search/Search'
import { DEFAULT_DEVICE_INFORMATION, Device, ProductLine } from '../features/devices/definitions'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const overrideParseErrorPropertiesWithDefaultValues = (issues: ZodIssue[], device: any) => {
  issues.forEach((issue) => {
    const path = issue.path
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let current: any = device
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let defaultCurrent: any = DEFAULT_DEVICE_INFORMATION

    for (let i = 0;i < path.length - 1;i++) {
      current = current[path[i]]
      defaultCurrent = defaultCurrent[path[i]]
    }

    const lastKey = path[path.length - 1]
    current[lastKey] = defaultCurrent[lastKey]
  })

  return device
}

export const getUpdatedFilters = (filters: ProductLine[], toggledFilter: ProductLine) => {
  if (filters.includes(toggledFilter)) {
    return filters.filter((filter) => filter !== toggledFilter)
  }

  return [...filters, toggledFilter]
}

export const getPreviousAndNextDevices = (devices: Device[], currentDeviceId: string): { previousDevice: Device | undefined, nextDevice: Device | undefined } => {
  const currentIndex = devices.findIndex((device) => device.id === currentDeviceId)
  const previousIndex = currentIndex - 1
  const nextIndex = currentIndex + 1

  return {
    previousDevice: devices[previousIndex],
    nextDevice: devices[nextIndex],
  }
}

export const getMatchingProperty = (device: Device, term: string): SearchMatch | null => {
  if (device.product.name.toLowerCase().includes(term)) {
    return { property: 'Product Name', value: device.product.name }
  }
  if (device.product.abbrev.toLowerCase().includes(term)) {
    return { property: 'Product Abbreviation', value: device.product.abbrev }
  }
  return null
}

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
export const getTooltipStyles = (position: TooltipPosition) => {
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