import { useState } from "react";
import "./styles.css";

export default function App() {
  return (
    <main>
      <TipCalculator />
    </main>
  );
}

function TipCalculator() {
  const [billAmount, setBillAmount] = useState(``);
  const [tipPercentages, setTipPercentages] = useState({ 1: 0, 2: 0 });

  const handleBillAmountChange = value => {
    setBillAmount(Number(value));
  };

  const handleTipPercentageChange = (id, value) => {
    setTipPercentages({ ...tipPercentages, [id]: Number(value) });
  };

  const resetCalculator = () => {
    setBillAmount(``);
    setTipPercentages({ 1: 0, 2: 0 });
  };

  return (
    <>
      <BillAmountForm billAmount={billAmount} onBillAmountChange={handleBillAmountChange} />
      <TipPercentageForm id="1" questionText="How did you like the service?" tipPercentage={tipPercentages["1"] || 0} onTipPercentageChange={handleTipPercentageChange} />
      <TipPercentageForm id="2" questionText="How did your friend like the service?" tipPercentage={tipPercentages["2"] || 0} onTipPercentageChange={handleTipPercentageChange} />

      {billAmount > 0 && (
        <>
          <TipResult billAmount={billAmount} tipPercentages={Object.values(tipPercentages)} />
          <ResetCalculator reset={resetCalculator} />
        </>
      )}
    </>
  );
}

function BillAmountForm({ billAmount, onBillAmountChange }) {
  return (
    <form>
      <label htmlFor="billAmount">How much was the bill?</label>
      <input type="number" id="billAmount" name="billAmount" value={billAmount} onChange={e => onBillAmountChange(e.target.value)} />
    </form>
  );
}

function TipPercentageForm({ id, questionText, tipPercentage, onTipPercentageChange }) {
  return (
    <form>
      <label htmlFor="tipPercentage">{questionText}</label>
      <select id="tipPercentage" name="tipPercentage" value={tipPercentage} onChange={e => onTipPercentageChange(id, e.target.value)}>
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely amazing! (20%)</option>
      </select>
    </form>
  );
}

function TipResult({ billAmount, tipPercentages }) {
  const tip = tipPercentages.length > 0 ? billAmount * (tipPercentages.reduce((a, b) => a + b) / tipPercentages.length / 100) : 0;
  return (
    <h2>
      You pay: ${(tip + billAmount).toFixed(2)} (${billAmount.toFixed(2)} + ${tip.toFixed(2)} tip)
    </h2>
  );
}

function ResetCalculator({ reset }) {
  return <button onClick={reset}>Reset</button>;
}
