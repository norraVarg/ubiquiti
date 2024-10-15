import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header/Header'
import data from '../data.json'
import { fetchDevicesSuccess } from '../features/devices/devicesSlice'
import { useAppDispatch } from '../hooks'

export const Root = () => {
  const dispatch = useAppDispatch()

  // to improve: fetch data with rtk-query instead of using static mock data
  useEffect(() => {
    dispatch(fetchDevicesSuccess(data.devices))
  }, [])

  return (
    <div className='flex flex-col min-w-80'>
      <Header />
      <div className='px-4 py-2 md:px-10 md:py-5'>
        <Outlet />
      </div>
    </div>
  )
}