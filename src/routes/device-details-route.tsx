import { useMemo } from 'react'
import { useNavigate, useSearchParams } from "react-router-dom"
import { DeviceDetails } from '../components/DeviceDetails/DeviceDetails'
import { ErrorMessage } from '../components/ErrorMessage/ErrorMessage'
import { Navbar } from '../components/Navbar/Navbar'
import { useAppSelector } from '../hooks/storeHooks'
import { getPreviousAndNextDevices } from '../utils/utils'

export const DeviceDetailsRoute = () => {
  const filteredDevices = useAppSelector((state) => state.devices.filteredDevices)
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const deviceId = searchParams.get('id')

  const { currentDevice, previousDevice, nextDevice } = useMemo(() => {
    const currentDevice = filteredDevices.find((device) => device.id === deviceId)

    if (!currentDevice) {
      return {}
    }

    const { previousDevice, nextDevice } = getPreviousAndNextDevices(filteredDevices, currentDevice.id)

    return { currentDevice, previousDevice, nextDevice }
  }, [filteredDevices, deviceId])

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
