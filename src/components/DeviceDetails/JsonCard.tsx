import { useState } from 'react'
import { Device } from '../../features/devices/definitions'

interface Props {
  data: Device
}

export const JsonCard = (props: Props) => {
  const { data } = props
  const [isPretty, setIsPretty] = useState(false)

  const json = isPretty ? JSON.stringify(data, null, 2) : JSON.stringify(data, null, 0)

  const togglePretty = () => {
    setIsPretty((prev) => !prev)
  }

  const onClickCopyJson = () => {
    navigator.clipboard.writeText(json)
  }

  return (
    <div className='flex flex-col items-center gap-3'>
      <div className='overflow-auto w-[calc(100vw-64px)] max-h-[calc(100vh-200px)] md:w-[calc(100vw-200px)] bg-web-unifi-color-neutral-2 p-2 rounded-lg'>
        {isPretty ? (
          <pre className=''>{json}</pre>
        ) : (
          <div className='break-all'>{json}</div>
        )}
      </div>
      <div className='flex gap-4'>
        {/* todo: show a tooltip with a message "JSON is copied" for 2 seconds */}
        <button onClick={onClickCopyJson} className='text-web-unifi-text-3 hover:text-web-unifi-color-ublue-06 hover:bg-web-unifi-color-neutral-2 rounded px-2 py-1 text-sm transition ease-in-out duration-300'>Copy JSON</button>
        <button onClick={togglePretty} className='text-web-unifi-text-3 hover:text-web-unifi-color-ublue-06 hover:bg-web-unifi-color-neutral-2 rounded px-2 py-1 text-sm transition ease-in-out duration-300'>{isPretty ? 'I prefer raw :)' : 'Make it Pretty!'}</button>
      </div>
    </div>
  )
}