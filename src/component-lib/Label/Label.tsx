interface Props {
  children: string
}

export const Label = (props: Props) => {
  const { children } = props

  return (
    <span className='text-nowrap text-web-unifi-text-0 text-opacity-85'>
      {children}
    </span>
  )
}