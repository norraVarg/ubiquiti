import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header/Header'
import { useAppDispatch } from '../hooks/storeHooks'
import { useEffect } from 'react'
import { useGetDevicesQuery } from '../features/devices/devicesApi'
import { fetchDevicesSuccess } from '../features/devices/devicesSlice'
import { ErrorMessage } from '../components/ErrorMessage/ErrorMessage'

export const Root = () => {
  const dispatch = useAppDispatch()

  const { data, error, isLoading } = useGetDevicesQuery()

  useEffect(() => {
    if (data) {
      dispatch(fetchDevicesSuccess(data.devices))
    }
  }, [data])

  if (isLoading) return <ErrorMessage message='Fetching devices...' />
  if (error) return <ErrorMessage message='Failded to fetch devices' />

  return (
    <div className='flex flex-col min-w-80'>
      <Header />
      <div className='px-5 py-2 sm:px-8 sm:py-4'>
        <Outlet />
      </div>
    </div>
  )
}
