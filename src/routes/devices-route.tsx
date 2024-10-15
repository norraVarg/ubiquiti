import { DevicesTable } from '../components/DevicesTable/DevicesTable'
import { Toolbar } from '../components/Toolbar/Toolbar'

export const DevicesRoute = () => {
  return (
    <div className='flex flex-col gap-2'>
      <Toolbar />
      <DevicesTable />
    </div>
  )
}