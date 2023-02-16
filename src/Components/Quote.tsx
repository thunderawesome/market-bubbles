import useQuote from '../Hooks/useQuote'
import React, { useState } from 'react'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

interface Props {
  id: number
  symbol: string
}

const truncateByDecimalPlace = (value: string, numDecimalPlaces: number) =>
  Math.trunc(Number(value) * Math.pow(10, numDecimalPlaces)) / Math.pow(10, numDecimalPlaces)

const QuoteRef = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { id, symbol } = props
  const { quote, symbolMap, error, isLoading } = useQuote(symbol)
  const [text, setText] = useState('No quote Available')

  const col = id % 2 === 0 ? new THREE.Color('rgb(200, 0, 0)') : new THREE.Color('rgb(0, 200, 0)')

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
      const price = truncateByDecimalPlace(quote.price, 2)
      setText(symbol + '\n\n' + price)
    } else {
      if (symbolMap) {
        const price = truncateByDecimalPlace(symbolMap[id]?.price, 2)
        setText(symbolMap[id]?.symbol + '\n\n' + price)
      }
    }
  }, [symbol, quote, id, symbolMap, isLoading, text, error])

  return (
    <Text ref={ref} color={col} outlineColor={'silver'} outlineWidth={0.025} textAlign={'center'} fontSize={0.25} position={[0, 0, 1.25]}>
      {text}
    </Text>
  )
})

const Quote = React.memo(QuoteRef)

export { Quote }
