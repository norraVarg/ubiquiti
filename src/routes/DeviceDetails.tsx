import { Link, useSearchParams } from "react-router-dom"

export const DeviceDetails = () => {
  const [searchParams] = useSearchParams()
  console.log('test', searchParams.get('id'))

  return (
    <div id="device-details">
      <h1>Device Details</h1>
      <p>Here are the details for a device.</p>
      <Link to={'/'}>back</Link>
    </div>
  )
}