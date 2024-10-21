import { useState } from 'react'
import { Device } from '../../features/devices/definitions'
import { TimeoutTooltip } from '../Tooltip/TimeoutTooltip'
import { TextButton } from '../../component-lib/TextButton/TextButton'

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
      <div className='flex items-center gap-2 w-full xs:justify-center'>
        <TextButton text={`${isPretty ? 'I prefer raw :)' : 'Make it Pretty!'}`} onClick={togglePretty} />
        <TimeoutTooltip position='right' message={<div className='flex items-center w-fit text-nowrap text-sm'>Copied to clipboard!</div>} >
          <TextButton text='Copy JSON' onClick={onClickCopyJson} />
        </TimeoutTooltip>
      </div>
    </div>
  )
}