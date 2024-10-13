import { useMemo } from 'react'
import { ProductLine } from '../../features/devices/devicesSlice'
import { useAppSelector } from '../../hooks'

export const DevicesTable = () => {
  const filters = useAppSelector((state) => state.devices.filters)
  const all = useAppSelector((state) => state.devices.all)

  // todo: implement pagination on scroll for large data sets
  const devices = useMemo(() => {
    if (filters.length === 0) {
      return all
    }

    return all.filter((device) => filters.includes(device.line.name as ProductLine))
  }, [filters, all])
  console.log('all', all)
  console.log('devices', devices)

  return (
    <div className=''>
      <div className='grid grid-cols-10 h-9 border-b border-web-unifi-color-neutral-3'>
        <span className='col-span-3 col-start-2 font-bold'>Product Line</span>
        <span className='col-span-6 font-bold'>Name</span>
      </div>
      {devices.map((device) => {
        return (
          <div key={device.id} className='grid grid-cols-10 text-web-unifi-text-1 text-opacity-60 items-center h-9 border-b border-web-unifi-color-neutral-3'>
            <img src={`https://static.ui.com/fingerprint/ui/icons/${device.icon.id}_25x25.png`} />
            <span className='col-span-3'>{device.line.name}</span>
            <span className='col-span-6'>{device.product.name}</span>
          </div>
        )
      })}
    </div>
  )
}