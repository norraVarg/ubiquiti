import { useParams } from "react-router-dom"
import { DeviceDetails } from '../components/DeviceDetails/DeviceDetails'
import { ErrorMessage } from '../components/ErrorMessage/ErrorMessage'
import { Navbar } from '../components/Navbar/Navbar'
import { useGetDeviceQuery } from '../features/devices/devicesApi'
import { useAppSelector } from '../hooks/storeHooks'
import { getPreviousAndNextDevices } from '../utils/utils'

export const DeviceDetailsRoute = () => {
  // to improve: 
  // 1. set and get filter by url params instead of using redux store
  // 2. add more filter types like deviceType, maxPower, etc.
  const { id } = useParams<{ id: string }>()
  const { data: device, error, isLoading } = useGetDeviceQuery(id || '')
  const filteredDevices = useAppSelector((state) => state.devices.filteredDevices)

  if (!id || !device) return <ErrorMessage message='No device found' />
  if (error) return <ErrorMessage message='Failded to fetch device' />
  if (isLoading) return <ErrorMessage message='Fetching device...' />
  if (!filteredDevices) return <ErrorMessage message='No devices found. Try to reset filter.' />

  const { previousDevice, nextDevice } = getPreviousAndNextDevices(filteredDevices, id)

  return (
    <div className='flex flex-col justify-center gap-4'>
      {/* todo: make the Navbar stick to top when scroll down the page */}
      <Navbar previousDevice={previousDevice} nextDevice={nextDevice} />
      <DeviceDetails device={device} />
    </div>
  )
}
