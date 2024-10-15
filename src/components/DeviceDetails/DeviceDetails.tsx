import { Device } from '../../features/devices/definitions'
import { useModal } from '../ModalProvider/ModalProvider'
import { JsonCard } from '../JsonCard/JsonCard'

interface Props {
  device: Device
}

export const DeviceDetails = (props: Props) => {
  const { device } = props
  const { open } = useModal()

  const onClickShowJson = () => {
    open({ content: <JsonCard data={device} />, title: device.product.name })
  }

  const onErrorImg = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null
    e.currentTarget.src = "/logo.svg"
  }

  // to improve: 
  // render fields dynamically based on different product lines
  // so only relavent information is shown
  return (
    <div className='flex flex-col md:flex-row md:justify-center gap-8 m-auto w-[calc(100vw-56px)] pb-4'>
      <img className='self-center h-64 w-64 md:h-85 md:w-85 bg-web-unifi-color-neutral-1 rounded-lg' onError={onErrorImg} src={`https://static.ui.com/fingerprint/ui/images/${device.id}/default/${device.images.default}.png`} />
      <div className='flex flex-col w-85 md:w-444 gap-2'>
        <h1 className='font-bold text-2xl text-opacity-85 text-web-unifi-text-0'>{device.product.name}</h1>
        <span className='text-web-unifi-text-0 text-opacity-45 mb-4'>{device.line.name}</span>
        <div className='flex flex-col md:flex-row justify-between gap-1 md:gap-8'>
          <span className='text-nowrap text-web-unifi-text-0 text-opacity-85'>Product Line</span>
          <span className='md:text-end text-web-unifi-text-0 text-opacity-45'>{device.line.name}</span>
        </div>
        <div className='flex flex-col md:flex-row justify-between gap-1 md:gap-8'>
          <span className='text-nowrap text-web-unifi-text-0 text-opacity-85'>ID</span>
          <span className='md:text-end text-web-unifi-text-0 text-opacity-45'>{device.line.id}</span>
        </div>
        <div className='flex flex-col md:flex-row justify-between gap-1 md:gap-8'>
          <span className='text-nowrap text-web-unifi-text-0 text-opacity-85'>Name</span>
          <span className='md:text-end text-web-unifi-text-0 text-opacity-45'>{device.product.name}</span>
        </div>
        <div className='flex flex-col md:flex-row justify-between gap-1 md:gap-8'>
          <span className='text-nowrap text-web-unifi-text-0 text-opacity-85'>Short Names</span>
          <span className='md:text-end text-web-unifi-text-0 text-opacity-45'>{device.shortnames.join(', ')}</span>
        </div>
        <div className='flex flex-col md:flex-row justify-between gap-1 md:gap-8'>
          <span className='text-nowrap text-web-unifi-text-0 text-opacity-85'>Max. Power</span>
          <span className='md:text-end text-web-unifi-text-0 text-opacity-45'>{device.unifi?.network?.radios?.na?.maxPower ?? '[not available]'}</span>
        </div>
        <div className='flex flex-col md:flex-row justify-between gap-1 md:gap-8'>
          <span className='text-nowrap text-web-unifi-text-0 text-opacity-85'>Speed</span>
          <span className='md:text-end text-web-unifi-text-0 text-opacity-45'>{device.unifi?.network?.details?.ipsThroughput ?? '[not available]'}</span>
        </div>
        <div className='flex flex-col md:flex-row justify-between gap-1 md:gap-8'>
          <span className='text-nowrap text-web-unifi-text-0 text-opacity-85'>Number of Ports</span>
          <span className='md:text-end text-web-unifi-text-0 text-opacity-45'>{device.unifi?.network?.numberOfPorts ?? '[not available]'}</span>
        </div>
        <button className='mt-4 md:mt-16 text-start text-web-unifi-color-ublue-06 w-fit' onClick={onClickShowJson}>See All Details as JSON</button>
      </div>
    </div>
  )
}