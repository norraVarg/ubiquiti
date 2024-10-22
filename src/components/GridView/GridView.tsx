import { Link } from 'react-router-dom'
import { Device } from '../../features/devices/definitions'
import { DeviceCard } from '../DeviceCard/DeviceCard'

interface Props {
  devices: Device[]
}

export const GridView = (props: Props) => {
  const { devices } = props

  return (
    <div role='grid-view' className='grid grid-cols-[repeat(auto-fill,140px)] gap-5 justify-center md:justify-start md:grid-cols-[repeat(auto-fill,210px)] overflow-y-auto max-h-[calc(100vh-200px)] sm:max-h-[calc(100vh-180px)] px-2'>
      {devices.map((device) => (
        <Link to={`device?id=${device.id}`} key={device.id} className='grid'>
          <DeviceCard device={device} />
        </Link>
      ))}
    </div>
  )
}