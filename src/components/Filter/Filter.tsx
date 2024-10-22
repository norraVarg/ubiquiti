import { ProductLine } from '../../features/devices/definitions'
import { setFilters } from '../../features/devices/devicesSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks'
import { getUpdatedFilters } from '../../utils/utils'
import { Menu } from '../Menu/Menu'

const FILTERS: ProductLine[] = [
  ProductLine.UniFi,
  ProductLine.UniFiLTE,
  ProductLine.UniFiProtect,
  ProductLine.UniFiAccess,
  ProductLine.AirMax,
  ProductLine.EdgeMax,
]

export const Filter = () => {
  const dispatch = useAppDispatch()
  const fitlers = useAppSelector((state) => state.devices.filters)
  const hasFilter = fitlers.length > 0

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const toggledFilter = e.currentTarget.value as ProductLine
    const updatedFilters = getUpdatedFilters(fitlers, toggledFilter)

    dispatch(setFilters(updatedFilters))
  }

  const onClickReset = () => {
    dispatch(setFilters([]))
  }

  return (
    <Menu trigger={<button className={`${hasFilter ? 'text-web-unifi-color-ublue-06' : 'text-web-unifi-text-0 text-opacity-45'} hover:bg-web-unifi-color-neutral-2 px-2.5 py-1.5 rounded border border-web-unifi-color-neutral-0 focus:border focus:border-web-unifi-color-ublue-06 transition ease-in-out duration-300`}>Filter</button>}>
      <div className='w-32 flex flex-col gap-4' role='filter-options'>
        <h3 className='font-bold'>Product line</h3>
        <div className='flex flex-col gap-2'>
          {FILTERS.map((filter) => (
            <div key={filter} className='flex'>
              <input className='cursor-pointer' type="checkbox" id={filter} name={filter} value={filter} checked={fitlers.includes(filter)} onChange={onChange} />
              <label className='pl-2 w-full text-web-unifi-text-0 text-opacity-65 cursor-pointer' htmlFor={filter}>{filter}</label>
            </div>
          ))}
        </div>
        <button onClick={onClickReset} disabled={fitlers.length === 0} className={`${hasFilter ? 'text-web-unifi-color-red-06' : 'text-web-unifi-color-red-03'} self-start`}>Reset</button>
      </div>
      {/* todo: add Other option to display new product line devices that FE is not expected */}
    </Menu>
  )
}