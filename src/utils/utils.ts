import { SearchMatch } from '../components/Search/Search'
import { Device, ProductLine } from '../features/devices/definitions'

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
  if (device.product.name?.toLowerCase().includes(term)) {
    return { property: 'Product Name', value: device.product.name }
  }
  if (device.product.abbrev?.toLowerCase().includes(term)) {
    return { property: 'Product Abbreviation', value: device.product.abbrev }
  }
  if (device.shortnames?.some(name => name.toLowerCase().includes(term))) {
    return { property: 'Short Name', value: device.shortnames.find(name => name.toLowerCase().includes(term)) || '' }
  }
  return null
}
