import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState("");

  useEffect(() => {
    const abortController = new AbortController();

    async function convertCurrency(amount, fromCurrency, toCurrency, abortSignal) {
      try {
        const response = await fetch(`https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`, { signal: abortSignal });

        const data = await response.json();

        setConvertedAmount(data.rates[toCurrency]);
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      }
    }

    if (amount > 0 && fromCurrency && toCurrency && fromCurrency !== toCurrency) convertCurrency(amount, fromCurrency, toCurrency, abortController.signal);
    else setConvertedAmount("");

    return () => abortController.abort();
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div>
      <input type="text" value={amount} onChange={e => setAmount(+e.target.value)} />
      <select value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={toCurrency} onChange={e => setToCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{convertedAmount ? `${convertedAmount} ${toCurrency}` : ""}</p>
    </div>
  );
}
