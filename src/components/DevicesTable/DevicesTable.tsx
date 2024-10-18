import { useAppSelector } from '../../hooks/storeHooks'
import { GridView } from '../GridView/GridView'
import { ListView } from '../ListView/ListView'

export const DevicesTable = () => {
  const filteredDevices = useAppSelector((state) => state.devices.filteredDevices)
  const viewMode = useAppSelector((state) => state.devices.viewMode)
  const isGridView = viewMode === 'grid'

  // todo: implement pagination on scroll for large data sets
  return (
    <div className={`${isGridView ? 'mt-2' : 'mt-0'}`}>
      {isGridView ? (
        <GridView devices={filteredDevices} />
      ) : (
        <ListView devices={filteredDevices} />
      )}
    </div>
  )
}