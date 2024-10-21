interface Props {
  text: string
  onClick: () => void
}

export const TextButton = (props: Props) => {
  const { text, onClick } = props

  return (
    <button onClick={onClick} className='text-nowrap text-web-unifi-text-3 hover:bg-web-unifi-color-neutral-2 rounded px-2 py-1 text-sm transition ease-in-out duration-300'>
      {text}
    </button>
  )
}
