import { DevicesTable } from '../components/DevicesTable/DevicesTable'
import { Toolbar } from '../components/Toolbar/Toolbar'

export const DevicesRoute = () => {
  return (
    <div id="devices">
      {/* <Filter /> */}
      {/* <Link to={'device?id=test-id'}>click me</Link> */}
      <Toolbar />
      <DevicesTable />
    </div>
  )
}