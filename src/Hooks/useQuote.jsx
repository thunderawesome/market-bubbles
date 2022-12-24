import { useState, useEffect } from 'react';

function useQuote(symbol) {
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [symbolMap, setSymbolMap] = useState({});

  useEffect(() => {
    async function fetchQuote() {
      setIsLoading(true);
      try {
        const response = await fetch('/mock/quotes.json');
        const data = await response.json();
        setSymbolMap(data.quotes);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchQuote();
  }, []);

  useEffect(() => {
    const quotes = Object.values(symbolMap);
    const quoteForSymbol = quotes.find((q) => q.symbol === symbol);
    setQuote(quoteForSymbol);
  }, [symbolMap, symbol]);

  return { quote, error, isLoading };
}

export default useQuote;
