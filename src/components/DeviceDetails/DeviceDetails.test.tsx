import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Device } from '../../features/devices/definitions'
import { DeviceDetails } from './DeviceDetails'
import { ModalProvider } from '../ModalProvider/ModalProvider'

const mockDevice: Device = {
  id: 'device_id',
  line: { name: 'Test Line', id: '123' },
  shortnames: ['TP'],
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

describe('DeviceDetails', () => {
  it('renders device details correctly', () => {
    render(
      <ModalProvider>
        <DeviceDetails device={mockDevice} />
      </ModalProvider>
    )

    expect(screen.getByText('Product Name', { selector: 'h1' })).toBeInTheDocument()
    expect(screen.getByText('Product Line', { selector: 'span' }).nextSibling?.textContent).toBe('Test Line')
    expect(screen.getByText('ID', { selector: 'span' }).nextSibling?.textContent).toBe('123')
    expect(screen.getByText('Name', { selector: 'span' }).nextSibling?.textContent).toBe('Product Name')
    expect(screen.getByText('Short Names', { selector: 'span' }).nextSibling?.textContent).toBe('TP')
    expect(screen.getByText('Max. Power', { selector: 'span' }).nextSibling?.textContent).toBe('20')
    expect(screen.getByText('Speed', { selector: 'span' }).nextSibling?.textContent).toBe('1Gbps')
    expect(screen.getByText('Number of Ports', { selector: 'span' }).nextSibling?.textContent).toBe('4')
    expect(screen.getByText('See All Details as JSON', { selector: 'button' })).toBeInTheDocument()
  })

  it('renders default image', () => {
    render(
      <ModalProvider>
        <DeviceDetails device={mockDevice} />
      </ModalProvider>
    )

    const img = screen.getByRole('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://static.ui.com/fingerprint/ui/images/device_id/default/default_id.png')
  })

  it('opens modal with JSON card on button click', async () => {
    render(
      <ModalProvider>
        <DeviceDetails device={mockDevice} />
      </ModalProvider>
    )

    const button = screen.getByText('See All Details as JSON', { selector: 'button' })
    button.click()

    const modalTitle = await screen.findByText('Product Name', { selector: 'h2' })
    expect(modalTitle).toBeInTheDocument()
    expect(screen.getByText('Make it pretty!', { selector: 'button' })).toBeInTheDocument()
    expect(screen.getByText('Copy JSON', { selector: 'button' })).toBeInTheDocument()

    screen.getByRole('close-button').click()
    await waitFor(() => {
      expect(screen.queryByText('Product Name', { selector: 'h2' })).not.toBeInTheDocument()
    })
  })
})