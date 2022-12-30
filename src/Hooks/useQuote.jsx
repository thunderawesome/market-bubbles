import { useState, useEffect } from 'react'

function useQuote(symbol) {
  const [quote, setQuote] = useState(null)
  const [count, setCount] = useState(0)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [symbolMap, setSymbolMap] = useState({})

  useEffect(() => {
    async function fetchQuote() {
      setIsLoading(true)
      try {
        const response = await fetch('/mock/quotes.json')
        const data = await response.json()
        setSymbolMap(data.quotes)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchQuote()
  }, [])

  useEffect(() => {
    if (!symbolMap) return
    if (symbolMap.length > 0) {
      setCount(symbolMap.length)
    }

    // For single quote using the Symbol as the key
    if (symbol) {
      const quoteForSymbol = symbolMap.find((q) => q.symbol === symbol)
      setQuote(quoteForSymbol)
    }
  }, [symbolMap, symbol])

  return { quote, symbolMap, count, error, isLoading }
}

export default useQuote
