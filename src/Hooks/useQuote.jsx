import { useState, useEffect } from 'react'

function useQuote(symbol) {
  const [quote, setQuote] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [symbolMap, setSymbolMap] = useState(null)

  useEffect(() => {
    async function fetchQuote() {
      setIsLoading(true)
      try {
        const response = await fetch('/mock/quotes.json')
        const data = await response.json()
        setSymbolMap(data)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchQuote()
  }, [symbol]) // added dependency on 'symbol'

  useEffect(() => {
    if (symbolMap) {
      setQuote(symbolMap[symbol])
    }
  }, [symbolMap, symbol])

  return { quote, error, isLoading }
}

export default useQuote
