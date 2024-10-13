import { ProductLine } from '../features/devices/devicesSlice'

export const getUpdatedFilters = (filters: ProductLine[], toggledFilter: ProductLine) => {
  if (filters.includes(toggledFilter)) {
    return filters.filter((filter) => filter !== toggledFilter)
  }

  return [...filters, toggledFilter]
}
