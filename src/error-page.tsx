interface Props {
  message?: string
}

export const ErrorPage = (props: Props) => {
  const { message = 'Sorry, an unexpected error has occurred.' } = props

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>{message}</p>
    </div>
  )
}