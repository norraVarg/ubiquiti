import { ProductLine, setFilters } from '../../features/devices/devicesSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { getUpdatedFilters } from '../../utils/utils'

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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const toggledFilter = e.currentTarget.value as ProductLine
    const updatedFilters = getUpdatedFilters(fitlers, toggledFilter)

    dispatch(setFilters(updatedFilters))
  }

  return (
    <div className='flex gap-2'>
      {FILTERS.map((filter) => (
        <div key={filter} >
          <input className='cursor-pointer' type="checkbox" id={filter} name={filter} value={filter} checked={fitlers.includes(filter)} onChange={onChange} />
          <label className='cursor-pointer' htmlFor={filter}>{filter}</label>
        </div>
      ))}

      {/* todo: add Other option to display new product line devices that FE is not expected */}
    </div>
  )
}