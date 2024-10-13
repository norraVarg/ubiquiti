import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header/Header'
import data from '../data.json'
import { setAll } from '../features/devices/devicesSlice'
import { useAppDispatch } from '../hooks'

export const Root = () => {
  const dispatch = useAppDispatch()

  // todo: fetch data with rtk-query instead of using static mock data
  useEffect(() => {
    dispatch(setAll(data.devices))
  }, [])

  return (
    <div className='flex flex-col'>
      <Header />
      <div className='px-10 py-5'>
        <Outlet />
      </div>
    </div>
  )
}