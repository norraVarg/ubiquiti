interface Props {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onMouseDown?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const CloseButton = (props: Props) => {
  const { onClick, onMouseDown } = props

  return (
    <button onClick={onClick} onMouseDown={onMouseDown} className='cursor hover:bg-web-unifi-color-neutral-2 rounded-full p-1'>
      <svg className="h-6 w-6 stroke-web-unifi-color-neutral-8" viewBox="0 0 24 24">
        <path d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  )
}

export default CloseButton