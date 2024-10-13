import { useMemo } from 'react'
import { ProductLine } from '../../features/devices/devicesSlice'
import { useAppSelector } from '../../hooks'
import { GridView } from '../GridView/GridView'
import { ListView } from '../ListView/ListView'

export const DevicesTable = () => {
  const filters = useAppSelector((state) => state.devices.filters)
  const all = useAppSelector((state) => state.devices.all)
  const viewMode = useAppSelector((state) => state.devices.viewMode)

  // todo: implement pagination on scroll for large data sets
  const devices = useMemo(() => {
    if (filters.length === 0) {
      return all
    }

    return all.filter((device) => filters.includes(device.line.name as ProductLine))
  }, [filters, all])

  return (
    <div className=''>
      {viewMode === 'grid' ? (
        <GridView devices={devices} />
      ) : (
        <ListView devices={devices} />
      )}
    </div>
  )
}