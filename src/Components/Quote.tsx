import useQuote from '../Hooks/useQuote'
import React, { useState } from 'react'
import { Text } from '@react-three/drei'

interface Props {
  id: number
  symbol: string
}

const QuoteRef = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { id, symbol } = props
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
      if (symbolMap) {
        setText(symbolMap[id]?.symbol)
      }
    }
  }, [symbol, quote, id, symbolMap, isLoading, text, error])

  return (
    <Text ref={ref} fontSize={0.25} position={[0, 0, 1.25]} color="black">
      {text}
    </Text>
  )
})

const Quote = React.memo(QuoteRef)

export { Quote }
