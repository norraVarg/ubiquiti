import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks'
import { setDevices } from '../features/devices/devicesSlice'
import { useEffect } from 'react'

export const Devices = () => {
  const devices = useAppSelector(state => state.devices)
  console.log('devices', devices)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setDevices(
      [
        {
          id: '1'
        },
        {
          id: '2'
        }
      ]
    ))
  }, [])
  return (
    <div id="devices">
      <h1>Devices</h1>
      <p>Here is a list of devices.</p>
      <Link to={'device?id=test-id'}>click me</Link>
    </div>
  )
}