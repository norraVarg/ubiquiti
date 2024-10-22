import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Device } from '../../features/devices/definitions'
import { DeviceCard } from './DeviceCard'

const mockDevice: Device = {
  id: 'device_id',
  line: { name: 'Test Line', id: '123' },
  shortnames: ['TP_ONE', 'TP_TWO'],
  icon: { id: 'icon_id', resolutions: [] },
  images: { default: 'default_id', nopadding: 'nopadding_id', topology: 'topology_id' },
  product: { abbrev: 'PN', name: 'Product Name' },
  compliance: { modelName: 'Test Model' },
  deviceType: '',
  unifi: {
    adoptability: '',
    network: {
      numberOfPorts: 4,
      bleServices: [],
      details: { ipsThroughput: '1Gbps', legacyPortRemap: true },
      radios: { na: { gain: 1, maxPower: 20, maxSpeedMegabitsPerSecond: 1 }, ng: { gain: 1, maxPower: 20, maxSpeedMegabitsPerSecond: 1 } }
    },
    deviceCapabilities: [],
    model: '',
    type: ''
  }
}

describe('DeviceCard', () => {
  it('renders device details correctly', () => {
    render(<DeviceCard device={mockDevice} />)
    expect(screen.getByText('Product Name')).toBeInTheDocument()
    expect(screen.getByText('TP_ONE, TP_TWO')).toBeInTheDocument()
    expect(screen.getByText('Test Line')).toBeInTheDocument()
    const img = screen.getByRole('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://static.ui.com/fingerprint/ui/icons/icon_id_128x128.png')
  })
})