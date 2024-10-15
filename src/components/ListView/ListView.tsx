import { Link } from 'react-router-dom'
import { Device } from '../../features/devices/definitions'

interface Props {
  devices: Device[]
}

export const ListView = (props: Props) => {
  const { devices } = props

  return (
    <>
      <div className='grid grid-cols-[40px_1fr_2fr] h-9 border-b border-web-unifi-color-neutral-3 items-center'>
        <span className='col-start-2 font-bold'>Product Line</span>
        <span className='font-bold'>Name</span>
      </div>
      <div className='overflow-y-auto max-h-screen-80 md:max-h-screen-75'>
        {devices.map((device) => {
          return (
            <Link to={`device?id=${device.id}`} state={device} key={device.id} className='h-fit transition ease-in-out duration-300 hover:bg-web-unifi-color-ublue-06 hover:bg-opacity-5 grid grid-cols-[40px_1fr_2fr] text-web-unifi-text-1 text-opacity-60 items-center h-9 border-b border-web-unifi-color-neutral-3'>
              <img src={`https://static.ui.com/fingerprint/ui/icons/${device.icon.id}_25x25.png`} />
              <span>{device.line.name}</span>
              <span>{device.product.name}</span>
            </Link>
          )
        })}
      </div>
    </>
  )
}