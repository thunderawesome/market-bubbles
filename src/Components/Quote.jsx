import useQuote from '../Hooks/useQuote'
import React, { useState } from 'react'
import { Text } from '@react-three/drei'

const Quote = React.memo(({ symbol, id }) => {
  const { quote, symbolMap, error, isLoading } = useQuote(symbol)
  const [text, setText] = useState('No quote Available')

  React.useEffect(() => {
    if (isLoading) {
      setText('Loading...')
      return
    }

    if (error) {
      setText('Error: ' + error.message)
      return
    }

    if (symbol && quote) {
      setText(symbol)
    } else {
      setText(symbolMap[id]?.symbol)
    }
  }, [symbol, quote, id, symbolMap, isLoading, text, error])

  return (
    <Text fontSize={1} position={[0, 0, 1.25]} color="black">
      {text}
    </Text>
  )
})

export { Quote }
