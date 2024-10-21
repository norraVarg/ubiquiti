import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from "react-router-dom"
import { DeviceDetails } from '../components/DeviceDetails/DeviceDetails'
import { ErrorMessage } from '../components/ErrorMessage/ErrorMessage'
import { Navbar } from '../components/Navbar/Navbar'
import { Device } from '../features/devices/definitions'
import { useAppSelector } from '../hooks/storeHooks'
import { getPreviousAndNextDevices } from '../utils/utils'

export const DeviceDetailsRoute = () => {
  const filteredDevices = useAppSelector((state) => state.devices.filteredDevices)
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const deviceId = searchParams.get('id')

  const [currentDevice, setCurrentDevice] = useState<Device>()
  const [previousDevice, setPreviousDevice] = useState<Device>()
  const [nextDevice, setNextDevice] = useState<Device>()

  const onClickPrevious = () => {
    if (previousDevice) {
      navigate(`/device?id=${previousDevice.id}`)
    }
  }

  const onClickNext = () => {
    if (nextDevice) {
      navigate(`/device?id=${nextDevice.id}`)
    }
  }

  useEffect(() => {
    if (deviceId && filteredDevices.length > 0) {
      const currentDevice = filteredDevices.find((device) => device.id === deviceId)
      if (currentDevice) {
        const { previousDevice, nextDevice } = getPreviousAndNextDevices(filteredDevices, currentDevice.id)
        setCurrentDevice(currentDevice)
        setPreviousDevice(previousDevice)
        setNextDevice(nextDevice)
      }
    }
  }, [filteredDevices, deviceId])

  return currentDevice ? (
    <div className='flex flex-col justify-center gap-4'>
      {/* todo: make the Navbar stick to top when scroll down the page */}
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
