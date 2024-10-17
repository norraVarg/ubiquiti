
import { describe, expect, it, } from 'vitest'
import { Device, ProductLine } from '../features/devices/definitions'
import { getPreviousAndNextDevices, getUpdatedFilters, getMatchingProperty } from './utils'

describe('getMatchingProperty', () => {
  it('should return matching property for product name', () => {
    const device = {
      product: {
        name: 'UniFi Dream Machine'
      },
      shortnames: [],
    } as unknown as Device
    const term = 'dream'
    const match = getMatchingProperty(device, term)
    expect(match).toEqual({ property: 'Product Name', value: 'UniFi Dream Machine' })
  })

  it('should return matching property for product abbreviation', () => {
    const device = {
      product: {
        abbrev: 'UDM'
      },
      shortnames: [],
    } as unknown as Device
    const term = 'udm'
    const match = getMatchingProperty(device, term)
    expect(match).toEqual({ property: 'Product Abbreviation', value: 'UDM' })
  })

  it('should return matching property for short name', () => {
    const device = {
      product: {
        name: 'UniFi Dream Machine'
      },
      shortnames: ['UDM'],
    } as Device
    const term = 'udm'
    const match = getMatchingProperty(device, term)
    expect(match).toEqual({ property: 'Short Name', value: 'UDM' })
  })

  it('should return null when no match is found', () => {
    const device = {
      product: {
        name: 'UniFi Dream Machine'
      },
      shortnames: [],
    } as unknown as Device
    const term = 'nano'
    const match = getMatchingProperty(device, term)
    expect(match).toBeNull()
  })

  it('should return null when product name is undefined', () => {
    const device = {
      product: {
        name: undefined
      },
      shortnames: [],
    } as unknown as Device
    const term = 'dream'
    const match = getMatchingProperty(device, term)
    expect(match).toBeNull()
  })

  it('should return null when product abbreviation is undefined', () => {
    const device = {
      product: {
        abbrev: undefined
      },
      shortnames: [],
    } as unknown as Device
    const term = 'udm'
    const match = getMatchingProperty(device, term)
    expect(match).toBeNull()
  })

  it('should return null when shortnames is undefined', () => {
    const device = {
      product: {
        name: 'UniFi Dream Machine'
      },
      shortnames: undefined,
    } as unknown as Device
    const term = 'udm'
    const match = getMatchingProperty(device, term)
    expect(match).toBeNull()
  })
})

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

describe('getPreviousAndNextDevices', () => {
  const devices = [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ] as Device[]

  it('should return previous and next devices', () => {
    const currentDeviceId = '2'
    const { previousDevice, nextDevice } = getPreviousAndNextDevices(devices, currentDeviceId)
    expect(previousDevice).toEqual(devices[0])
    expect(nextDevice).toEqual(devices[2])
  })

  it('should return undefined for previous device when current device is the first device', () => {
    const currentDeviceId = '1'
    const { previousDevice, nextDevice } = getPreviousAndNextDevices(devices, currentDeviceId)
    expect(previousDevice).toBeUndefined()
    expect(nextDevice).toEqual(devices[1])
  })

  it('should return undefined for next device when current device is the last device', () => {
    const currentDeviceId = '3'
    const { previousDevice, nextDevice } = getPreviousAndNextDevices(devices, currentDeviceId)
    expect(previousDevice).toEqual(devices[1])
    expect(nextDevice).toBeUndefined()
  })

  it('should return undefined for previous and next device when devices is empty', () => {
    const devices = [] as Device[]
    const currentDeviceId = '3'
    const { previousDevice, nextDevice } = getPreviousAndNextDevices(devices, currentDeviceId)
    expect(previousDevice).toBeUndefined()
    expect(nextDevice).toBeUndefined()
  })
})