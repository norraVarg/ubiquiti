interface Props {
  message?: string
}

export const ErrorMessage = (props: Props) => {
  const { message = 'Sorry, an unexpected error has occurred. Please contact tech team.' } = props

  return (
    <p className='flex justify-center'>{message}</p>
  )
}