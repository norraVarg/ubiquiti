import { useState } from 'react'
import { useLocation } from "react-router-dom"
import { DeviceDetails } from '../components/DeviceDetails/DeviceDetails'
import { ErrorMessage } from '../components/ErrorMessage/ErrorMessage'
import { Device } from '../features/devices/definitions'
import { useAppSelector } from '../hooks'
import { getPreviousAndNextDevices } from '../utils/utils'
import { Navbar } from '../components/Navbar/Navbar'

export const DeviceDetailsRoute = () => {
  // to improve:: 
  // fetch device data from api with device id in the url
  // instead of passing preloaded device data via location state
  const { state } = useLocation()
  const device = state as Device

  const [currentDevice, setCurrentDevice] = useState<Device>(device)

  const filteredDevices = useAppSelector((state) => state.devices.filteredDevices)

  const { previousDevice, nextDevice } = getPreviousAndNextDevices(filteredDevices, currentDevice.id)

  const onClickPrevious = () => {
    if (previousDevice) {
      setCurrentDevice(previousDevice)
    }
  }

  const onClickNext = () => {
    if (nextDevice) {
      setCurrentDevice(nextDevice)
    }
  }

  return device ? (
    <div className='flex flex-col justify-center gap-4'>
      <Navbar
        previousDevice={previousDevice}
        nextDevice={nextDevice}
        onClickPrevious={onClickPrevious}
        onClickNext={onClickNext} />
      <DeviceDetails device={currentDevice} />
    </div>
  ) : (
    <ErrorMessage message='No device found' />
  )
}
