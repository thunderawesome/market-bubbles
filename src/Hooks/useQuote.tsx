import { useState, useEffect } from 'react'

type Quote = {
  symbol: string
  open: string
  high: string
  low: string
  price: string
  volume: string
  latestTradingDay: string
  previousClose: string
  change: string
  changePercent: string
}

type Quotes = Array<Quote>

function useQuote(symbol: string) {
  const [quote, setQuote] = useState<Quote>()
  const [qCount, setCount] = useState(0)
  const [error, setError] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [symbolMap, setSymbolMap] = useState<Quotes>()

  useEffect(() => {
    async function fetchQuote() {
      setIsLoading(true)
      try {
        const response = await fetch('/mock/quotes.json')
        const data = await response.json()
        setSymbolMap(data.quotes as Quotes)
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
      const quoteForSymbol = symbolMap.find((q: Quote) => q.symbol === symbol)
      setQuote(quoteForSymbol)
    }
  }, [symbolMap, symbol])

  return { quote, symbolMap, qCount, error, isLoading }
}

export default useQuote
