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