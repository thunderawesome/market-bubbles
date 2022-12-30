import useQuote from '../Hooks/useQuote'
import React from 'react'
import { Text } from '@react-three/drei'

const Quote = React.memo(({ symbol }) => {
  const { quote, error, isLoading } = useQuote(symbol)

  if (isLoading) {
    return 'Loading...'
  }

  if (error) {
    return 'Error: ' + error.message
  }

  const innerText = quote ? symbol : 'No quote available'

  return (
    <Text fontSize={1} position={[0, 0, 1.25]} color="black">
      {innerText}
    </Text>
  )
})

export { Quote }
