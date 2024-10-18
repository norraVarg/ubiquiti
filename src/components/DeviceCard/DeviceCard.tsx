import { Device } from '../../features/devices/definitions'

interface Props {
  device: Device
}

export const DeviceCard = (props: Props) => {
  const { device } = props

  return (
    <div className='transition ease-in-out duration-300 hover:border-web-unifi-color-ublue-06 grid grid-cols-1 grid-rows-[100px_1fr_1fr] border-web-unifi-color-neutral-3 border rounded-lg shadow-sm'>
      <div className='bg-web-unifi-color-neutral-1 grid col-start-1 row-start-1 row-span-1 justify-center items-center rounded-lg'>
        <img className='w-24 h-24' src={`https://static.ui.com/fingerprint/ui/icons/${device.icon.id}_128x128.png`} />
      </div>
      <span className='p-0.5 md:p-1 m-1 rounded bg-web-unifi-color-neutral-0 text-2xs md:text-xs text-web-unifi-color-ublue-06 row-start-1 col-start-1 justify-self-end self-start'>{device.line.name}</span>
      <span className='p-2 text-opacity-85 text-web-unifi-text-0'>{device.product.name}</span>
      <span className='p-2 text-sm text-opacity-45 text-web-unifi-text-0'>{device.shortnames.join(', ')}</span>
    </div>

  )
}