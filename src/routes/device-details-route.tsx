import { useState } from 'react'
import { Link, useLocation } from "react-router-dom"
import { DeviceDetails } from '../components/DeviceDetails/DeviceDetails'
import { ErrorMessage } from '../components/ErrorMessage/ErrorMessage'
import { Device } from '../features/devices/definitions'
import { useAppSelector } from '../hooks'
import { getPreviousAndNextDevices } from '../utils/utils'

export const DeviceDetailsRoute = () => {
  // to improve:: 
  // fetch device data from api with device id from url search params
  // instead of passing preloaded device data via location state
  const { state } = useLocation()
  const device = state as Device

  const [currentDevice, setCurrentDevice] = useState<Device>(device)

  const devices = useAppSelector((state) => state.devices.all)

  const { previousDevice, nextDevice } = getPreviousAndNextDevices(devices, currentDevice.id)

  const onClickPrevious = () => {
    if (previousDevice) {
      setCurrentDevice(previousDevice)
    }
  }

  const onClickNext = () => {
    if (nextDevice) {
      setCurrentDevice(nextDevice)
    }
  }

  return device ? (
    <div className='flex flex-col justify-center gap-4'>
      <div className='flex items-center justify-between'>
        {/* todo: scroll to the same device when click Back */}
        <Link to={'/'} className='flex items-center gap-2 rounded w-16 h-6 text-web-unifi-text-0 text-opacity-45 fill-web-unifi-color-neutral-8 hover:bg-web-unifi-color-neutral-2 rounded px-2 py-1 text-sm transition ease-in-out duration-300'>
          <svg className='w-1.9 h-3.4'>
            <path d="M5.5 12a.501.501 0 0 1-.364-.157L.287 6.701A.994.994 0 0 1 0 6c0-.264.102-.513.287-.701L5.136.157a.5.5 0 0 1 .728.686L1 6l.01.01 4.854 5.146A.5.5 0 0 1 5.5 12Z" />
          </svg>
          <span className='mb-0.5'>Back</span>
        </Link>
        <div className='flex items-center gap-2'>
          {previousDevice ? (
            <button onClick={onClickPrevious} className='flex items-center justify-center gap-2 rounded w-6 h-6 text-web-unifi-text-0 text-opacity-45 fill-web-unifi-color-neutral-8 hover:bg-web-unifi-color-neutral-2 rounded px-2 py-1 text-sm transition ease-in-out duration-300'>
              <svg className='w-1.9 h-3.4'>
                <path d="M5.5 12a.501.501 0 0 1-.364-.157L.287 6.701A.994.994 0 0 1 0 6c0-.264.102-.513.287-.701L5.136.157a.5.5 0 0 1 .728.686L1 6l.01.01 4.854 5.146A.5.5 0 0 1 5.5 12Z" />
              </svg>
            </button>
          ) : (
            // to improve: disable the button and show a tooltip when hover on the arrow
            <span className='text-web-unifi-text-0 text-opacity-45 text-sm'>Reached First Item</span>
          )}
          {nextDevice ? (
            <button onClick={onClickNext} className='flex items-center justify-center gap-2 rounded w-6 h-6 text-web-unifi-text-0 text-opacity-45 fill-web-unifi-color-neutral-8 hover:bg-web-unifi-color-neutral-2 rounded px-2 py-1 text-sm transition ease-in-out duration-300'>
              <svg className='w-1.9 h-3.4'>
                <path d="M.5 12a.501.501 0 0 0 .364-.157l4.849-5.142A.994.994 0 0 0 6 6a.994.994 0 0 0-.287-.701L.864.157a.5.5 0 0 0-.728.686L5 6l-.01.01-4.854 5.146A.5.5 0 0 0 .5 12Z" />
              </svg>
            </button>
          ) : (
            // to improve: disable the button and show a tooltip when hover on the arrow
            <span className='text-web-unifi-text-0 text-opacity-45 text-sm'>Reached Last Item</span>
          )}
        </div>
      </div>
      <DeviceDetails device={currentDevice} />
    </div>
  ) : (
    <ErrorMessage message='No device found' />
  )
}
