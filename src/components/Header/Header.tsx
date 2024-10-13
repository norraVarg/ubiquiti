import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <div className='h-14 flex items-center bg-web-unifi-color-neutral-2 pl-2 pr-5'>
      <Link to={'/'} className='h-12 w-12 flex items-center justify-center border-web-unifi-color-ublue-06 rounded focus:border-2'>
        <svg className='h-6 w-6 fill-web-unifi-color-neutral-10 hover:fill-web-unifi-color-ublue-06' viewBox='0 0 20 20'>
          <path d="M19.375 0h-1.25v1.25h1.25V0ZM15.002 8.753V6.25h2.5v2.5H20v.793c0 .915-.078 2-.257 2.853-.1.476-.252.95-.43 1.404a9.8 9.8 0 0 1-1.668 2.801l-.022.025-.035.041a7.506 7.506 0 0 1-.297.334c-.122.13-.248.254-.377.378a9.938 9.938 0 0 1-5.863 2.723 13.74 13.74 0 0 1-1.051.055c-.264-.001-.79-.028-1.051-.055a9.942 9.942 0 0 1-5.863-2.723A10.004 10.004 0 0 1 2.709 17c-.11-.114-.21-.23-.31-.349l-.043-.05a9.793 9.793 0 0 1-1.669-2.802 8.916 8.916 0 0 1-.43-1.404C.077 11.542 0 10.457 0 9.542V.157h4.998v8.596s0 .66.009.875l.002.05c.01.28.02.553.05.824.082.772.253 1.505.604 2.124.102.18.206.353.33.518a5.028 5.028 0 0 0 3.323 1.965c.17.024.513.046.684.046.171 0 .514-.022.684-.046a5.028 5.028 0 0 0 3.324-1.965c.124-.165.227-.339.329-.518.351-.62.522-1.351.605-2.123.029-.273.039-.547.05-.826l.001-.05c.008-.215.008-.874.008-.874Z" />
          <path d="M15.625 1.875H17.5V3.75H20v2.5h-2.5V3.75h-1.875V1.875Z" />
        </svg>
      </Link>
      <span className='text-web-unifi-text-3 ml-10'>Devices</span>
      <span className='text-web-unifi-text-3 ml-auto'>Author/Y.W</span>
    </div>
  )
}