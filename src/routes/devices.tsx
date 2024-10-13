import { Link } from 'react-router-dom'
import { DevicesTable } from '../components/DevicesTable/DevicesTable'
import { Filter } from '../components/Filter/Filter'
import { Toolbar } from '../components/Toolbar/Toolbar'

export const Devices = () => {
  return (
    <div id="devices">
      {/* <Filter /> */}
      {/* <Link to={'device?id=test-id'}>click me</Link> */}
      <Toolbar />
      <DevicesTable />
    </div>
  )
}