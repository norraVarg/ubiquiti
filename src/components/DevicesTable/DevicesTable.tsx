import { useEffect } from 'react'
import { useAppDispatch } from '../../hooks'
import { setDevices } from '../../features/devices/devicesSlice'

export const DevicesTable = () => {
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
    <div className=''>
      <h1>DevicesTable</h1>
    </div>
  )
}