"use script";

import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const stepDefaultValue = 1;
const stepMinValue = 0;
const stepMaxValue = 10;
const countDefaultValue = 0;

Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

function Counter() {
  const [step, setStep] = useState(stepDefaultValue);
  const [count, setCount] = useState(countDefaultValue);

  let textString = ``;
  if (count === 0) textString = `Today is`;
  else if (count < 0) textString = `${Math.abs(count)} days ago was`;
  else if (count > 0) textString = `${count} days from today is`;

  function handleResetStateOnClick() {
    setCount(countDefaultValue);
    setStep(stepDefaultValue);
  }

  return (
    <div>
      <div>
        <input type="range" min={stepMinValue} max={stepMaxValue} step={1} value={step} onChange={e => setStep(+e.target.value)} />
        <span>Step: {step}</span>
      </div>
      <div>
        <button type="button" onClick={() => setCount(c => c - step)}>
          -
        </button>
        <input type="text" value={count} onChange={e => setCount(+e.target.value)} />
        <button type="button" onClick={() => setCount(c => c + step)}>
          +
        </button>
      </div>

      <p>
        {textString} {new Date(Date.now()).addDays(count).toDateString()}
      </p>

      {(step !== stepDefaultValue || count !== countDefaultValue) && (
        <button type="button" onClick={handleResetStateOnClick}>
          Reset
        </button>
      )}
    </div>
  );
}

const rootElement = document.getElementById(`root`);
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
