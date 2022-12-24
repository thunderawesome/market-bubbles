import useQuote from '../Hooks/useQuote'
import React from 'react'

const Quote = React.memo(({ symbol }) => {
  const { quote, error, isLoading } = useQuote(symbol)

  if (isLoading) {
    return 'Loading...'
  }

  if (error) {
    return 'Error: ' + error.message
  }

  return quote ? (
    <>
      {quote.symbol}
      <br />
      <br />
      {quote.price}
    </>
  ) : (
    'No quote available'
  )
})

export { Quote }
