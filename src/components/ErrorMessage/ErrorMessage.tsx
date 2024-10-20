interface Props {
  message?: string
}

export const ErrorMessage = (props: Props) => {
  const { message = 'Sorry, an unexpected error has occurred. Please contact our tech team.' } = props

  return (
    <div className='flex justify-center items-center h-screen'>{message}</div>
  )
}