import { Link } from 'react-router-dom'
import { Device } from '../../features/devices/definitions'
import { useAppSelector } from '../../hooks/storeHooks'
import { Tooltip } from '../Tooltip/Tooltip'

interface Props {
  previousDevice: Device | undefined
  nextDevice: Device | undefined
  onClickPrevious: () => void
  onClickNext: () => void
}

export const Navbar = (props: Props) => {
  const {
    previousDevice,
    nextDevice,
    onClickPrevious,
    onClickNext,
  } = props

  const filters = useAppSelector((state) => state.devices.filters)
  const hasFilters = filters.length > 0

  return (
    <div className='flex items-center justify-between'>
      {/* todo: scroll to the same device when click Back button */}
      <Link to={'/'} className='shadow flex items-center gap-2 rounded w-16 h-6 text-web-unifi-text-0 text-opacity-45 fill-web-unifi-color-neutral-8 hover:bg-web-unifi-color-neutral-2 rounded px-2 py-1 text-sm transition ease-in-out duration-300'>
        <svg className='w-1.9 h-3.4'>
          <path d="M5.5 12a.501.501 0 0 1-.364-.157L.287 6.701A.994.994 0 0 1 0 6c0-.264.102-.513.287-.701L5.136.157a.5.5 0 0 1 .728.686L1 6l.01.01 4.854 5.146A.5.5 0 0 1 5.5 12Z" />
        </svg>
        <span>Back</span>
      </Link>
      <div className='flex items-center gap-2'>
        {hasFilters && <span className='text-web-unifi-color-ublue-06 text-opacity-50 text-sm'>Currently browsing filtered devices</span>}
        <Tooltip
          trigger={
            <button onClick={onClickPrevious} disabled={!previousDevice} className={`${previousDevice ? 'opacity-100 hover:bg-web-unifi-color-neutral-2' : 'opacity-50'} shadow flex items-center justify-center gap-2 rounded w-6 h-6 fill-web-unifi-color-neutral-8 rounded px-2 py-1 text-sm transition ease-in-out duration-300`}>
              <svg className='w-1.9 h-3.4'>
                <path d="M5.5 12a.501.501 0 0 1-.364-.157L.287 6.701A.994.994 0 0 1 0 6c0-.264.102-.513.287-.701L5.136.157a.5.5 0 0 1 .728.686L1 6l.01.01 4.854 5.146A.5.5 0 0 1 5.5 12Z" />
              </svg>
            </button>
          }
          message={<div className='text-sm text-web-unifi-color-neutral-8 px-1 py-0.5 md:px-3 md:py-1.5'>First item reached</div>}
          position="top"
          disabled={!!previousDevice}
        />
        <Tooltip
          trigger={
            <button onClick={onClickNext} disabled={!nextDevice} className={`${nextDevice ? 'opacity-100 hover:bg-web-unifi-color-neutral-2' : 'opacity-50'} shadow flex items-center justify-center gap-2 rounded w-6 h-6 text-web-unifi-text-0 text-opacity-45 fill-web-unifi-color-neutral-8 hover:bg-web-unifi-color-neutral-2 rounded px-2 py-1 text-sm transition ease-in-out duration-300`}>
              <svg className='w-1.9 h-3.4'>
                <path d="M.5 12a.501.501 0 0 0 .364-.157l4.849-5.142A.994.994 0 0 0 6 6a.994.994 0 0 0-.287-.701L.864.157a.5.5 0 0 0-.728.686L5 6l-.01.01-4.854 5.146A.5.5 0 0 0 .5 12Z" />
              </svg>
            </button>
          }
          message={<div className='text-sm text-web-unifi-color-neutral-8 px-1 py-0.5 md:px-3 md:py-1.5'>Last item reached</div>}
          position="top-left"
          disabled={!!nextDevice}
        />
      </div>
    </div>
  )
}