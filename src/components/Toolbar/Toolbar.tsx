import { setViewMode } from '../../features/devices/devicesSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'

export const Toolbar = () => {
  const dispatch = useAppDispatch()

  const onClickListView = () => {
    dispatch(setViewMode('list'))
  }

  const onClickGridView = () => {
    dispatch(setViewMode('grid'))
  }

  const viewMode = useAppSelector((state) => state.devices.viewMode)

  return (
    <div className='flex items-center justify-end'>
      <div className='mr-auto'>search</div>
      <button onClick={onClickListView} className={`${viewMode === 'list' ? 'fill-web-unifi-color-ublue-06' : 'fill-web-unifi-color-neutral-8'} flex items-center justify-center w-9 h-9 hover:bg-web-unifi-color-neutral-2 rounded border-web-unifi-color-ublue-06 focus:border`}>
        <svg className='w-4 h-4' viewBox='0 0 14 14'>
          <mask id="a">
            <path d="M3 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM4.75.75h8.5a.75.75 0 0 1 0 1.5h-8.5a.75.75 0 0 1 0-1.5ZM1.5 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm3.25-2.25h8.5a.75.75 0 0 1 0 1.5h-8.5a.75.75 0 0 1 0-1.5ZM1.5 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm3.25-2.25h8.5a.75.75 0 0 1 0 1.5h-8.5a.75.75 0 0 1 0-1.5Z" />
          </mask>
          <path d="M1.5 4A2.5 2.5 0 0 0 4 1.5H2a.5.5 0 0 1-.5.5v2ZM-1 1.5A2.5 2.5 0 0 0 1.5 4V2a.5.5 0 0 1-.5-.5h-2ZM1.5-1A2.5 2.5 0 0 0-1 1.5h2a.5.5 0 0 1 .5-.5v-2ZM4 1.5A2.5 2.5 0 0 0 1.5-1v2a.5.5 0 0 1 .5.5h2Zm9.25-1.75h-8.5v2h8.5v-2ZM15 1.5a1.75 1.75 0 0 0-1.75-1.75v2A.25.25 0 0 1 13 1.5h2Zm-1.75 1.75A1.75 1.75 0 0 0 15 1.5h-2a.25.25 0 0 1 .25-.25v2Zm-8.5 0h8.5v-2h-8.5v2ZM3 1.5c0 .966.784 1.75 1.75 1.75v-2A.25.25 0 0 1 5 1.5H3ZM4.75-.25A1.75 1.75 0 0 0 3 1.5h2a.25.25 0 0 1-.25.25v-2ZM2 7a.5.5 0 0 1-.5.5v2A2.5 2.5 0 0 0 4 7H2Zm-.5-.5A.5.5 0 0 1 2 7h2a2.5 2.5 0 0 0-2.5-2.5v2ZM1 7a.5.5 0 0 1 .5-.5v-2A2.5 2.5 0 0 0-1 7h2Zm.5.5A.5.5 0 0 1 1 7h-2a2.5 2.5 0 0 0 2.5 2.5v-2Zm11.75-2.25h-8.5v2h8.5v-2ZM15 7a1.75 1.75 0 0 0-1.75-1.75v2A.25.25 0 0 1 13 7h2Zm-1.75 1.75A1.75 1.75 0 0 0 15 7h-2a.25.25 0 0 1 .25-.25v2Zm-8.5 0h8.5v-2h-8.5v2ZM3 7c0 .966.784 1.75 1.75 1.75v-2A.25.25 0 0 1 5 7H3Zm1.75-1.75A1.75 1.75 0 0 0 3 7h2a.25.25 0 0 1-.25.25v-2ZM2 12.5a.5.5 0 0 1-.5.5v2A2.5 2.5 0 0 0 4 12.5H2Zm-.5-.5a.5.5 0 0 1 .5.5h2A2.5 2.5 0 0 0 1.5 10v2Zm-.5.5a.5.5 0 0 1 .5-.5v-2A2.5 2.5 0 0 0-1 12.5h2Zm.5.5a.5.5 0 0 1-.5-.5h-2A2.5 2.5 0 0 0 1.5 15v-2Zm11.75-2.25h-8.5v2h8.5v-2ZM15 12.5a1.75 1.75 0 0 0-1.75-1.75v2a.25.25 0 0 1-.25-.25h2Zm-1.75 1.75A1.75 1.75 0 0 0 15 12.5h-2a.25.25 0 0 1 .25-.25v2Zm-8.5 0h8.5v-2h-8.5v2ZM3 12.5c0 .966.784 1.75 1.75 1.75v-2a.25.25 0 0 1 .25.25H3Zm1.75-1.75A1.75 1.75 0 0 0 3 12.5h2a.25.25 0 0 1-.25.25v-2Z" mask="url(#a)" />
        </svg>
      </button>
      <button onClick={onClickGridView} className={`${viewMode === 'grid' ? 'fill-web-unifi-color-ublue-06' : 'fill-web-unifi-color-neutral-8'} flex items-center justify-center w-9 h-9 fill-web-unifi-color-neutral-8 hover:bg-web-unifi-color-neutral-2 rounded border-web-unifi-color-ublue-06 focus:border`}>
        <svg className='w-4 h-4' viewBox='0 0 14 14'>
          <path d="M5.5 5.5V1H1v4.5h4.5ZM1 0h4.5a1 1 0 0 1 1 1v4.5a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1Zm4.5 13V8.5H1V13h4.5ZM1 7.5h4.5a1 1 0 0 1 1 1V13a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V8.5a1 1 0 0 1 1-1ZM13 1v4.5H8.5V1H13Zm0-1H8.5a1 1 0 0 0-1 1v4.5a1 1 0 0 0 1 1H13a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1Zm0 13V8.5H8.5V13H13ZM8.5 7.5H13a1 1 0 0 1 1 1V13a1 1 0 0 1-1 1H8.5a1 1 0 0 1-1-1V8.5a1 1 0 0 1 1-1Z" />
        </svg>
      </button>
      {/* <Filter /> */}
    </div>
  )
}
