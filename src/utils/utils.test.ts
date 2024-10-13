
import { describe, expect, it, } from 'vitest'
import { getUpdatedFilters } from './utils'
import { ProductLine } from '../features/devices/devicesSlice'

describe('getUpdatedFilters', () => {
  it('should add a filter if it does not exist', () => {
    const filters = [ProductLine.UniFi]
    const toggledFilter = ProductLine.UniFiLTE
    const updatedFilters = getUpdatedFilters(filters, toggledFilter)
    expect(updatedFilters).toEqual([ProductLine.UniFi, ProductLine.UniFiLTE])
  })

  it('should remove a filter if it exists', () => {
    const filters = [ProductLine.UniFi, ProductLine.UniFiLTE]
    const toggledFilter = ProductLine.UniFi
    const updatedFilters = getUpdatedFilters(filters, toggledFilter)
    expect(updatedFilters).toEqual([ProductLine.UniFiLTE])
  })

  it('should add a filter when fitlers is empty', () => {
    const filters: ProductLine[] = []
    const toggledFilter = ProductLine.UniFi
    const updatedFilters = getUpdatedFilters(filters, toggledFilter)
    expect(updatedFilters).toEqual([ProductLine.UniFi])
  })

  it('should remove a filter when fitlers has a single filter', () => {
    const filters = [ProductLine.UniFi]
    const toggledFilter = ProductLine.UniFi
    const updatedFilters = getUpdatedFilters(filters, toggledFilter)
    expect(updatedFilters).toEqual([])
  })
})
