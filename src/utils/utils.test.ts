
import { describe, expect, it, } from 'vitest'
import { DEFAULT_DEVICE_INFORMATION, Device, ProductLine } from '../features/devices/definitions'
import { getMatchingProperty, getPreviousAndNextDevices, getTooltipStyles, getUpdatedFilters, TooltipPosition, overrideParseErrorPropertiesWithDefaultValues } from './utils'
import { z } from 'zod'

describe('overrideParseErrorPropertiesWithDefaultValues', () => {
  it('should override missing properties with default values', () => {
    const device = {
      icon: { id: 'icon1', resolutions: [[1, 2], [3, 4]] },
      id: 'device1',
      images: { nopadding: 'nopadding.jpg', topology: 'topology.jpg' },
      line: { id: 'line1' },
      product: { abbrev: 'D1', name: 'Device One' },
    }

    const issues = [
      {
        path: ['line', 'name'],
      },
      {
        path: ['images', 'default'],
      },
      { path: ['unifi'] }
    ] as z.ZodIssue[]

    const updatedDevice = overrideParseErrorPropertiesWithDefaultValues(issues, device)

    expect(updatedDevice.line.name).toBe(DEFAULT_DEVICE_INFORMATION.line.name)
    expect(updatedDevice.images.default).toBe(DEFAULT_DEVICE_INFORMATION.images.default)
    expect(updatedDevice.unifi).toEqual(DEFAULT_DEVICE_INFORMATION.unifi)
    expect(updatedDevice.icon.id).toBe('icon1')
    expect(updatedDevice.icon.resolutions).toEqual([[1, 2], [3, 4]])
  })

  it('should return the original device if there are no issues', () => {
    const device = {
      icon: { id: 'icon1', resolutions: [[1, 2], [3, 4]] },
      id: 'device1',
      images: { default: 'default.jpg', nopadding: 'nopadding.jpg', topology: 'topology.jpg' },
      line: { id: 'line1', name: 'Line 1' },
      product: { abbrev: 'D1', name: 'Device One' },
      compliance: { modelName: 'Model X' },
      deviceType: 'Type A',
      shortnames: ['D1', 'Dev1'],
      sku: 'SKU1',
      sysid: 'SYS1',
      sysids: ['SYS1'],
      triplets: [{ k1: 'K1', k2: 'K2', k3: 'K3' }],
    }

    const issues: z.ZodIssue[] = []

    const updatedDevice = overrideParseErrorPropertiesWithDefaultValues(issues, device)

    expect(updatedDevice).toEqual(device)
  })
})

describe('getTooltipStyles', () => {
  const testCases: { position: TooltipPosition; expected: string }[] = [
    { position: 'top', expected: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2' },
    { position: 'bottom', expected: 'top-full left-1/2 transform -translate-x-1/2 mt-2' },
    { position: 'left', expected: 'top-1/2 right-full transform -translate-y-1/2 mr-2' },
    { position: 'right', expected: 'top-1/2 left-full transform -translate-y-1/2 ml-2' },
    { position: 'top-left', expected: 'bottom-full right-0 mb-2' },
    { position: 'top-right', expected: 'bottom-full left-0 mb-2' },
    { position: 'bottom-left', expected: 'top-full right-0 mt-2' },
    { position: 'bottom-right', expected: 'top-full left-0 mt-2' },
  ]

  testCases.forEach(({ position, expected }) => {
    it(`should return correct styles for position: ${position}`, () => {
      const result = getTooltipStyles(position)
      expect(result).toBe(expected)
    })
  })

  it('should return an empty string for an invalid position', () => {
    const result = getTooltipStyles('invalid' as TooltipPosition)
    expect(result).toBe('')
  })
})

describe('getMatchingProperty', () => {
  it('should return matching property for product name', () => {
    const device = {
      product: {
        name: 'UniFi Dream Machine'
      },
    } as Device
    const term = 'dream'
    const match = getMatchingProperty(device, term)
    expect(match).toEqual({ property: 'Product Name', value: 'UniFi Dream Machine' })
  })

  it('should return matching property for product abbreviation', () => {
    const device = {
      product: {
        name: 'fake name',
        abbrev: 'UDM'
      },
    } as Device
    const term = 'udm'
    const match = getMatchingProperty(device, term)
    expect(match).toEqual({ property: 'Product Abbreviation', value: 'UDM' })
  })

  it('should return null when no match is found', () => {
    const device = {
      product: {
        name: 'UniFi Dream Machine',
        abbrev: 'UDM',
      },
    } as unknown as Device
    const term = 'nano'
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