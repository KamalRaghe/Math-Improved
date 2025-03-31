import { useState, useEffect } from "react";

export default function CurrencyConverter() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [rates, setRates] = useState({});
  const countryNames = {
    USD: "United States Dollar",
    EUR: "Euro",
    GBP: "British Pound Sterling",
    JPY: "Japanese Yen",
    AUD: "Australian Dollar",
    CAD: "Canadian Dollar",
    CHF: "Swiss Franc",
    CNY: "Chinese Yuan",
    INR: "Indian Rupee",
    BRL: "Brazilian Real",
    ZAR: "South African Rand",
  };

  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => response.json())
      .then((data) => {
        setRates(data.rates);
        setCurrencies(Object.keys(data.rates));
      });
  }, []);

  useEffect(() => {
    if (rates[fromCurrency] && rates[toCurrency]) {
      const conversion = (amount / rates[fromCurrency]) * rates[toCurrency];
      setConvertedAmount(conversion.toFixed(2));
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Currency Converter</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 border rounded"
        />
        <div className="flex gap-4">
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="p-2 border rounded"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency} - {countryNames[currency] || "Unknown"}
              </option>
            ))}
          </select>
          <span className="self-center">➡️</span>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="p-2 border rounded"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency} - {countryNames[currency] || "Unknown"}
              </option>
            ))}
          </select>
        </div>
        <h2 className="text-xl font-semibold">Converted Amount: {convertedAmount} {toCurrency}</h2>
      </div>
    </div>
  );
}
